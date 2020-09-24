const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MealTimeSchema = new Schema({
  name: {
    type: String
  },
  dishes: {
    type: Array
  }
});
module.exports = mongoose.model("MealTime", MealTimeSchema);
