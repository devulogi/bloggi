const router = require("express").Router();
const passport = require("passport");
const { index, signup, logout } = require("../controllers/gen.controller");
const { profile, updateProfile } = require("../controllers/profile.controller");
const {
  blog,
  createBlog,
  updateBlog,
} = require("../controllers/blog.controller");
const {
  routerMiddleware,
  checkAuthentication,
  pageNotFound,
} = require("../config/helper");

router.use(routerMiddleware);

router.get("/", index);

router.get("/profile", checkAuthentication, profile);

router.post("/profile/update/:id", updateProfile);

router.get("/blog/:id", blog);

router.post("/blog/create", createBlog);

router.post("/blog/update", updateBlog);

router.post(
  "/signup",
  signup,
  passport.authenticate("local", {
    successRedirect: "/",
    successFlash: true,
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    successFlash: true,
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/logout", logout);

router.use(pageNotFound);

module.exports = router;
