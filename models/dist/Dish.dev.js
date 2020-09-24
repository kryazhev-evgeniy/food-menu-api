"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var DishSchema = new Schema({
  naem: {
    type: String,
    required: true
  },
  urlImage: {
    type: String
  }
});
module.exports = mongoose.model("Dish", DishSchema);