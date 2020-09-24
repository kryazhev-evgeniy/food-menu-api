"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var MealTimeSchema = new Schema({
  name: {
    type: String
  },
  dishes: {
    type: Array
  }
});
module.exports = mongoose.model("MealTime", MealTimeSchema);