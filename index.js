const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

require("./config/middlewares")(app);

app.use(require("./routes/gen.route"));

require("./config/mongodb")();

app.listen(process.env.PORT || 3000, function () {
  console.log("Application running...");
});
