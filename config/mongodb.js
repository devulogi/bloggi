const mongoose = require("mongoose");

const DbConnection = function () {
  mongoose.connect("mongodb://localhost:27017/bloggi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = DbConnection;
