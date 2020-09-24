const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DayDishSchema = new Schema({
  date: {
    type: Date,
    default: new Date()
  },
  mealTimes: {
    type: Array
  }
});
module.exports = mongoose.model("DayDish", DayDishSchema);
