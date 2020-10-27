const User = require("../models/user.model");
const Blog = require("../models/blog.model");

const index = function (req, res, next) {
  Blog.find({})
    .populate("author", "username")
    .then(function (blogs) {
      res.render("index", { blogs });
    })
    .catch(function (err) {
      if (err) {
        return next(err);
      }
    });
};

const signup = function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash("error", "Username already exist.");
      return res.redirect("/");
    }
    const newuser = new User(req.body);
    newuser.save(next);
  });
};

const logout = function (req, res) {
  req.logout();
  res.redirect("/");
};

module.exports = {
  index,
  signup,
  logout,
};
