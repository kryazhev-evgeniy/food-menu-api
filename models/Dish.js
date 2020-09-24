const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DishSchema = new Schema({
  naem: {
    type: String,
    required: true
  },
  urlImage: {
    type: String
  }
});
module.exports = mongoose.model("Dish", DishSchema);
