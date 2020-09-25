const passport = require("passport");
const config = require("./config");
const User = require("./models/User");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      }).catch((err) => {
        return done(err, false);
      });
    })
  );
};
