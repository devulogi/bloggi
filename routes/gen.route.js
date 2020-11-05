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
  deleteBlog,
  getUpdateBlogPage,
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
router.post("/profile/update/:id", checkAuthentication, updateProfile);
router.get("/profile/delete/:profileID", checkAuthentication, deleteProfile);

// blog routes
router.get("/blogs/:id", getBlogPage);
router.post("/blogs", checkAuthentication, createBlog);
router
  .route("/blogs/update/:id")
  .all(checkAuthentication)
  .get(getUpdateBlogPage)
  .post(updateBlog);
router.post("/blogs/delete/:id", checkAuthentication, deleteBlog);

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
