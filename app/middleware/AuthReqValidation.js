const Joi = require('joi');
const { getErrMessages, validationOptions } = require('../service/joi');

const login = (req, res, next) => {
  const data = req.body;
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  };

  Joi.validate(data, schema, validationOptions, (err) => {
    if (err) {
      res.status(400)
        .json({
          status: 'FAILED',
          messages: getErrMessages(err),
        });
    } else {
      next();
    }
  });
};

const register = (req, res, next) => {
  const data = req.body;
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  };

  Joi.validate(data, schema, validationOptions, (err) => {
    if (err) {
      res.status(400)
        .json({
          status: 'FAILED',
          messages: getErrMessages(err),
        });
    } else {
      next();
    }
  });
};

module.exports = {
  login,
  register,
};
