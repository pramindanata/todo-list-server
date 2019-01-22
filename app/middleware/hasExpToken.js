const jwt = require('jsonwebtoken');
const apiService = require('../service/api');
const jwtConfig = require('../../config/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.substr('Bearer '.length);

    return jwt.verify(token, jwtConfig.secret, (err) => {
      if (err && err.name === 'TokenExpiredError') {
        req.tokenPayload = jwt.decode(token);

        return next();
      }

      return apiService.sendJsonWithCode(res, 401, null, 'Invalid token given');
    });
  }

  return apiService.sendJsonWithCode(res, 401, null, 'No token given');
};
