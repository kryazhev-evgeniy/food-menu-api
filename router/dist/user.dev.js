"use strict";

var express = require("express");

var jwt = require("jwt-simple");

var router = express.Router();

var User = require("../models/User");

var config = require("../config");

var passport = require("passport");

router.get("/", passport.authenticate("jwt", {
  session: false
}), function _callee(req, res) {
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
router.post("/auth", function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(req.body.password && req.body.login)) {
            _context4.next = 6;
            break;
          }

          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            login: req.body.login,
            password: req.body.password
          }, function (err, user) {
            if (err) {
              res.status(401).json({
                message: "что-то пошло не так"
              });
            }

            if (user) {
              var payload = {
                id: user._id,
                login: user.login
              };
              var token = jwt.encode(payload, config.secretKey);
              res.status(200).json({
                token: token
              });
            } else {
              res.status(401).json({
                message: "Такой пользователь не зарегистрирован"
              });
            }
          }));

        case 3:
          user = _context4.sent;
          _context4.next = 7;
          break;

        case 6:
          res.status(401).json({
            message: "Ведите логин и авроль"
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.put("/setpass", passport.authenticate("jwt", {
  session: true
}), function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.body.id, {
            password: req.body.passport
          }, {
            "new": true
          }, function (err, user) {
            if (err) {
              res.status(404).json({
                message: err.message
              });
            } else {
              res.status(200).json(user);
            }
          }));

        case 2:
          user = _context5.sent;

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;