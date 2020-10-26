module.exports = {
  checkAuthentication: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash("info", "You must be logged in to comment.");
      res.redirect("/");
    }
  },
  routerMiddleware: function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    res.locals.successess = req.flash("success");
    next();
  },
};
