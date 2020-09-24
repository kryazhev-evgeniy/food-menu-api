const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  await User.find({}, (err, docs) => {
    if (err) return console.log(err);
    res.status(200).json(docs);
  });
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(404).json({ message: err.message });
    });
});
router.delete("/", async (req, res) => {
  console.log(req.body);
  await User.findByIdAndDelete(req.body.id, err => {
    if (err) {
      res.status(404).json({
        message: err.message
      });
    }
    res.status(200).json({
      message: "ok"
    });
  });
});
module.exports = router;
