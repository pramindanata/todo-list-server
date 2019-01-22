const { sendJsonWithCode } = require('../service/api');
const appConfig = require('../../config/app');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack);

  if (appConfig.debug) {
    return res.status(500)
      .send(err.stack);
  }

  return sendJsonWithCode(res, 500, false, 'Server error');
};
