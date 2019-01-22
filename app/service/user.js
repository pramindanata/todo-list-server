const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');

const comparePassword = (givenPass, hashedPass) => new Promise((resolve, reject) => {
  bcrypt.compare(givenPass, hashedPass, (err, res) => {
    if (err) {
      reject(err);
    }

    resolve(res);
  });
});

const generateToken = user => new Promise((resolve) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: user._id.toHexString() }, jwtConfig.secret, {
    expiresIn: jwtConfig.ttl,
  });

  resolve(token);
});

const refreshToken = payload => new Promise((resolve) => {
  const currentTime = new Date() / 1000;
  const diff = currentTime - payload.iat;

  if (diff <= jwtConfig.refresh_ttl) {
    const token = jwt.sign({
      id: payload.id,
      iat: payload.iat,
      exp: Math.floor(currentTime + jwtConfig.ttl),
    }, jwtConfig.secret);

    resolve(token);
  } else {
    resolve(null);
  }
});

module.exports = {
  comparePassword,
  generateToken,
  refreshToken,
};
