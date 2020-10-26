const router = require("express").Router();
const passport = require("passport");
const {
  index,
  profile,
  blog,
  createBlog,
  signup,
  logout,
} = require("../controllers/gen.controller");

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in to comment.");
    res.redirect("/");
  }
}

router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  res.locals.sucessess = req.flash("success");
  next();
});

router.get("/", index);

router.get("/profile", checkAuthentication, profile);

router.get("/blog/:id", checkAuthentication, blog);

router.post("/blog/create", createBlog);

router.post(
  "/signup",
  signup,
  passport.authenticate("local", {
    successFlash: true,
    successMessage: "Success! 🐈",
    successRedirect: "/",
    failureFlash: true,
    failureMessage: "Opps! try again ☕",
    failureRedirect: "/",
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/logout", logout);

module.exports = router;
