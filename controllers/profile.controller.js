const User = require("../models/user.model");

const profile = function (req, res, next) {
  User.findOne({ _id: res.locals.currentUser })
    .populate("blogs")
    .then(function (user) {
      res.render("profile", { blogs: user.blogs });
    })
    .catch(function (err) {
      next(err);
    });
};

const updateProfile = function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash("error", "Username already exist.");
      return res.redirect("/");
    }
    User.findOneAndUpdate({ _id: req.params.id }, req.body, function (
      err,
      user
    ) {
      if (err) {
        return next(err);
      }
      req.flash("info", "Update successful!");
      res.redirect("/profile");
    });
  });
};

module.exports = {
  profile,
  updateProfile,
};
