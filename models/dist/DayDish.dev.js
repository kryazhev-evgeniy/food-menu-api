"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var DayDishSchema = new Schema({
  date: {
    type: Date,
    "default": new Date()
  },
  mealTimes: {
    type: Array
  }
});
module.exports = mongoose.model("DayDish", DayDishSchema);