const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");
const app = express();
const path = require("path");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log(`Connected data base`);
  })
  .catch(() => {
    console.log("Error connect data base");
  });

express.static(path.join(__dirname, "public"));

app.use(passport.initialize());
require("./passport")(passport);

app.use("/api/user", require("./router/user"));
app.use("/api/dish", require("./router/dish"));
app.use("/api/daydish", require("./router/dayDish"));
app.use("/api/mealtime", require("./router/mealTime"));

app.listen(config.port, () => {
  console.log(`Server started http://localhost:${config.port}`);
});
