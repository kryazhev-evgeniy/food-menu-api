const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://localhost:27017/food-menu", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Connected data base`);
  });

app.use("/api/user", require("./router/user"));
app.use("/api/dish", require("./router/dish"));
app.use("/api/daydish", require("./router/dayDish"));

app.listen(3000, () => {
  console.log(`Server started http://localhost:${3000}`);
});
