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

const profile = function (req, res) {
  res.render("profile");
};

const createBlog = function (req, res, next) {
  const { title, content, description, id } = req.body;
  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      return next(err);
    }
    const newBlog = new Blog({ title, content, description });
    newBlog.author = user;
    newBlog.save(function (err, blog) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Horrayyy! New blog create!");
      res.redirect("/profile");
    });
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
  profile,
  createBlog,
  signup,
  logout,
};
