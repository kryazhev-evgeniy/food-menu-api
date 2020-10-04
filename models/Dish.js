const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  urlImage: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
  },
});
module.exports = mongoose.model("Dish", DishSchema);
