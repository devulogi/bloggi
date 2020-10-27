const User = require("../models/user.model");
const Blog = require("../models/blog.model");

const blog = function (req, res, next) {
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

const updateBlog = function (req, res, next) {
  Blog.findOne({ _id: req.body.blogID })
    .then(function (blog) {
      res.send(blog);
    })
    .catch(function (err) {
      next(err);
    });
};

module.exports = {
  blog,
  createBlog,
  updateBlog,
};
