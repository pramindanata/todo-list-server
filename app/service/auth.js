const passport = require('../../lib/passport');

const authenticate = () => passport.authenticate('jwt', {
  session: false,
});

module.exports = {
  authenticate,
  passport,
};
