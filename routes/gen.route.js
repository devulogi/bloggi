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

// runs everytime route is visited
router.use(routerMiddleware);

// index
router.get("/", index);

// profile routes
router.get("/profile", checkAuthentication, profile);
router.post("/profile/update/:id", updateProfile);
router.get("/profile/delete/:profileID", deleteProfile);

// blog routes
router.get("/blogs/:id", getBlogPage);
router.post("/blogs", createBlog);
router.post("/blogs/:id", updateBlog);

// sign-up
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

// log-in
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    successFlash: true,
    failureRedirect: "/",
    failureFlash: true,
  })
);

// log-out
router.get("/logout", logout);

// page not found!
router.use(pageNotFound);

module.exports = router;
