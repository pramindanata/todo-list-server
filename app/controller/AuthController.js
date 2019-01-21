const express = require('express');

const User = require('../model/user');
const apiService = require('../service/api');
const userService = require('../service/user');
const authReqValidation = require('../middleware/authReqValidation');

const router = express.Router();

router.post('/login', authReqValidation.login, async (req, res, next) => {
  const data = req.body;

  try {
    let user = await User.findOne({
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
    user = {
      name: user.name,
      email: user.email,
    };

    return apiService.sendJson(res, true, null, {
      user,
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

module.exports = router;
