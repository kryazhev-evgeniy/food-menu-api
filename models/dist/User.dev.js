"use strict";

var mongoose = require("mongoose");

var Schema = new mongoose.Schema({
  username: {
    type: String,
    "default": ""
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    "default": {}
  },
  isAdmin: {
    type: Boolean,
    required: true,
    "default": false
  }
});
module.exports = mongoose.model("User", Schema);