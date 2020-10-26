const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

const Strateties = function (passport) {
  passport.use(
    "local",
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.checkPassword(password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    })
  );
};

module.exports = Strateties;
