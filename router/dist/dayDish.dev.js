"use strict";

var express = require("express");

var router = express.Router();
router.get("/", function (req, res) {
  res.json({
    Message: "Hello World"
  });
});
module.exports = router;