const { sendJsonWithCode } = require('../service/api');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack);

  if (process.env.NODE_ENV !== 'production') {
    return res.status(500)
      .send(err.stack);
  }

  return sendJsonWithCode(res, 500, false, 'Server error');
};
