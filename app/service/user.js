const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const comparePassword = (givenPass, hashedPass) => new Promise((resolve, reject) => {
  bcrypt.compare(givenPass, hashedPass, (err, res) => {
    if (err) {
      reject(err);
    }

    resolve(res);
  });
});

const generateToken = async (user) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: user._id.toHexString() }, process.env.JWT_SECRET, {
    expiresIn: 86400 * 7,
  });

  return token;
};

module.exports = {
  comparePassword,
  generateToken,
};
