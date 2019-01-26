const express = require('express');

const User = require('../model/user');
const apiService = require('../service/api');
const userService = require('../service/user');
const { validateObjectId } = require('../service/mongo');
const authReqValidation = require('../middleware/authReqValidation');
const hasExpToken = require('../middleware/hasExpToken');

const router = express.Router();

router.post('/login', authReqValidation.login, async (req, res, next) => {
  const data = req.body;

  try {
    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      return apiService.sendJsonWithCode(res, 401, false, 'Incorrect email or password');
    }

    const comparePassRes = await userService.comparePassword(data.password, user.password);

    if (!comparePassRes) {
      return apiService.sendJsonWithCode(res, 401, false, 'Incorrect email or password ');
    }

    const token = await userService.generateToken(user);

    return apiService.sendJson(res, true, null, {
      token,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/register', authReqValidation.register, async (req, res, next) => {
  const data = req.body;

  try {
    const user = await User.findOne({
      email: data.email,
    });

    if (user) {
      return apiService.sendJsonWithCode(res, 400, false, 'Email already taken');
    }

    await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return apiService.sendJson(res, true, 'New user added');
  } catch (err) {
    return next(err);
  }
});

router.get('/token', hasExpToken, async (req, res, next) => {
  const { tokenPayload } = req;

  validateObjectId(tokenPayload.id);

  try {
    const user = await User.findOne({ _id: tokenPayload.id });

    if (!user) {
      return apiService.sendJsonWithCode(res, 401, false, 'User not found');
    }

    const token = await userService.refreshToken(tokenPayload);

    if (token) {
      return apiService.sendJson(res, true, null, {
        token,
      });
    }

    return apiService.sendJsonWithCode(res, 401, null, 'Need relogin');
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
