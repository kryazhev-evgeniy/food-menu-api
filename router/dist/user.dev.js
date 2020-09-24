"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/User");

router.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find({}, function (err, docs) {
            if (err) return console.log(err);
            res.status(200).json(docs);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          user = new User(req.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(user.save().then(function () {
            res.status(200).json(user);
          })["catch"](function (err) {
            res.status(404).json({
              message: err.message
            });
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]("/", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.body.id, function (err) {
            if (err) {
              res.status(404).json({
                message: err.message
              });
            }

            res.status(200).json({
              message: "ok"
            });
          }));

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;