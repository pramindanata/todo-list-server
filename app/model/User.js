const bcrypt = require('bcryptjs');
const mongoose = require('../../lib/mongoose');

const schema = new mongoose.Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },
  email: {
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  password: {
    minLength: 6,
    required: true,
    type: String,
  },
});

schema.pre('save', function save(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(err);
      }

      bcrypt.hash(user.password, salt, (_err, hash) => {
        if (_err) {
          next(_err);
        }

        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
