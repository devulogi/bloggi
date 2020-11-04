const express = require("express");
const path = require("path");
require("dotenv").config();

// express instance
const app = express();

// template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// relative file path
app.use(express.static(path.join(__dirname, "public")));

// runs every request
require("./config/middlewares")(app);

// routes
app.use(require("./routes/gen.route"));

// mongo database connection
require("./config/mongodb")();

// listens to http traffic
app.listen(process.env.PORT || 3000, function () {
  console.log("Application running...");
});
