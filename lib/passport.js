const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../app/model/user');

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opt, async (req, jwtPayload, done) => {
  try {
    const user = await User.findOne({
      _id: jwtPayload.id,
    });

    if (user) {
      req.user = user;

      return done(null, user);
    }

    return done(null, false, {
      message: 'Invalid token given',
    });
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;
