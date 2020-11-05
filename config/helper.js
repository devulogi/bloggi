module.exports = {
  pageNotFound: function (req, res, next) {
    res.send("Page not found!");
  },
  checkAuthentication: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash("error", "You must be authorized to do that.");
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
