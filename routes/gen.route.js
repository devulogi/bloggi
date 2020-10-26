const router = require("express").Router();
const passport = require("passport");
const {
  index,
  profile,
  updateProfile,
  blog,
  createBlog,
  updateBlog,
  signup,
  logout,
} = require("../controllers/gen.controller");
const { routerMiddleware, checkAuthentication } = require("../config/helper");

router.use(routerMiddleware);

router.get("/", index);

router.get("/profile", checkAuthentication, profile);

router.post("/profile/update/:id", updateProfile);

router.get("/blog/:id", blog);

router.post("/blog/create", createBlog);

router.post(
  "/signup",
  signup,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
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
