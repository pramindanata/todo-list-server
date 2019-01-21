const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const getErrMessages = (err) => {
  const { details } = err;
  const messages = details.map(item => item.message);

  return messages;
};

module.exports = {
  getErrMessages,
  validationOptions,
};
