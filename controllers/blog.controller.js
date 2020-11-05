const User = require("../models/user.model");
const Blog = require("../models/blog.model");

const createBlog = function (req, res, next) {
  const { title, content, description, id } = req.body;
  User.findOne({ _id: id }, async function (err, user) {
    if (err) {
      return next(err);
    }
    const newBlog = new Blog({ title, content, description });
    newBlog.author = user;
    user.blogs.push(newBlog);
    Promise.all([newBlog.save(), user.save()]).then(function () {
      req.flash("success", "Horrayyy!");
      res.redirect("/profile");
    });
  });
};

const getBlogPage = function (req, res, next) {
  Blog.findOne({ _id: req.params.id }, function (err, blog) {
    if (err) {
      return next(err);
    }
    if (!blog) {
      req.flash("error", "Ops! Resource not found");
      return res.redirect("/");
    }
    res.render("blog", { blog });
  });
};

const getUpdateBlogPage = function (req, res, next) {
  Blog.findOne({ _id: req.params.id }, function (err, blog) {
    if (err) return next(err);
    res.status(200).render("updateBlogPage", { blog });
  });
};

const updateBlog = function (req, res, next) {
  User.findOne({ _id: req.body.id }, function (err, user) {
    if (err) return next(err);
    if (!user) {
      req.logout();
      res.redirect("/");
    }
    if (user) {
      console.log(req.params.id);
      Blog.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        function (err, blog) {
          if (err) return next(err);
          res.redirect("/");
        }
      );
    }
  });
};

const deleteBlog = function (req, res) {
  Blog.findOneAndRemove({ _id: req.params.id }, { new: true }, function (
    err,
    blog
  ) {
    if (!err) {
      req.flash("success", "Blog deleted successfully!");
      res.status(204).redirect("/");
    }
  });
};

module.exports = {
  createBlog,
  getBlogPage,
  updateBlog,
  deleteBlog,
  getUpdateBlogPage,
};
