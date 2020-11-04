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

const deleteProfile = function (req, res, next) {
  User.findOne({ _id: req.params.profileID }, function (err, user) {
    if (err) {
      return next(err);
    }
    User.findOneAndRemove({ _id: user._id }, function (err, user) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Profile does not exist anymore.");
      req.logout();
      return res.status(204).redirect("/");
    });
  });
};

module.exports = {
  profile,
  updateProfile,
  deleteProfile,
};
