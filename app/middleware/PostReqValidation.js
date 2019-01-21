const Joi = require('joi');
const { getErrMessages, validationOptions } = require('../service/joi');

const store = (req, res, next) => {
  const data = req.body;
  const schema = {
    title: Joi.string().required().max(30),
    content: Joi.string().required(),
  };

  Joi.validate(data, schema, validationOptions, (err) => {
    if (err) {
      res.status(400)
        .json({
          status: 'FAILED',
          messages: getErrMessages(err),
        });
    }
  });

  next();
};

const update = (req, res, next) => {
  const data = req.body;
  const schema = {
    title: Joi.string().required().max(30),
    content: Joi.string().required(),
  };

  Joi.validate(data, schema, validationOptions, (err) => {
    if (err) {
      res.status(400)
        .json({
          status: 'FAILED',
          messages: getErrMessages(err),
        });
    }
  });

  next();
};

module.exports = {
  store,
  update,
};
