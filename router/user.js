const express = require("express");
const jwt = require("jwt-simple");
const router = express.Router();
const User = require("../models/User");
const config = require("../config");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await User.find({}, (err, docs) => {
      if (err) return console.log(err);
      res.status(200).json(docs);
    });
  }
);
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body);
    await User.findByIdAndDelete(req.body.id, (err) => {
      if (err) {
        res.status(404).json({
          message: err.message,
        });
      }
      res.status(200).json({
        message: "ok",
      });
    });
  }
);
router.post("/auth", async (req, res) => {
  if (req.body.password && req.body.login) {
    const user = await User.findOne(
      {
        login: req.body.login,
        password: req.body.password,
      },
      (err, user) => {
        if (err) {
          res.status(401).json({
            message: "что-то пошло не так",
          });
        }
        if (user) {
          var payload = {
            id: user._id,
            login: user.login,
          };
          const token = jwt.encode(payload, config.secretKey);
          res.status(200).json({
            token: token,
            user: {
              name: user.username,
              isAdmin: user.isAdmin,
              data: user.data,
            },
          });
        } else {
          res.status(401).json({
            message: "Такой пользователь не зарегистрирован",
          });
        }
      }
    );
  } else {
    res.status(401).json({
      message: "Ведите логин и авроль",
    });
  }
});
router.put(
  "/setpass",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.body.id,
      {
        password: req.body.password,
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(404).json({
            message: err.message,
          });
        } else {
          res.status(200).json(user);
        }
      }
    );
  }
);

module.exports = router;
