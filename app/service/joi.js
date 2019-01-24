const { forEach } = require('lodash');

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const getErrMessages = (err) => {
  const { details } = err;
  const messages = {};

  forEach(details, (category) => {
    const { key } = category.context;

    (messages[key] || (messages[key] = [])).push(category.message);
  });

  return messages;
};

module.exports = {
  getErrMessages,
  validationOptions,
};
