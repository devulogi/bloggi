const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  image: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "comment",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;
