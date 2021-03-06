const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const morgan = require("morgan");
require("dotenv").config();

const User = require("../models/user.model");

const Middlewares = function (app) {
  app.use(methodOverride("X-HTTP-Method")); // Microsoft
  app.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
  app.use(methodOverride("X-Method-Override")); // IBM
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  require("./strategies")(passport);
};

module.exports = Middlewares;
