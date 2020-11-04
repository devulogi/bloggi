const router = require("express").Router();
const passport = require("passport");
const { index, signup, logout } = require("../controllers/gen.controller");
const {
  profile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");
const {
  getBlogPage,
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

router.get("/profile/delete/:profileID", deleteProfile);

router.get("/blogs/:id", getBlogPage);

router.post("/blogs", createBlog);

router.post("/blogs/:id", updateBlog);

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
