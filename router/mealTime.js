const express = require("express");
const router = express.Router();
const MealTime = require("../models/MealTime");
const Dish = require("../models/Dish");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const mealtimes = await MealTime.find().lean();
  if (mealtimes) {
    let fullmealtime = mealtimes;
    for (let index = 0; index < mealtimes.length; index++) {
      fullmealtime[index].dishes = await Dish.find({
        _id: { $in: mealtimes[index].dishes },
      });
    }
    res.status(200).json(fullmealtime);
  } else {
    res.status(404).json({
      message: "Not mealtimes",
    });
  }
});
router.post("/", async (req, res) => {
  if (req.body) {
    const mealtime = new MealTime(req.body);
    await mealtime
      .save()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(404).json({
          message: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: "No data body",
    });
  }
});
router.put("/", async (req, res) => {
  if (req.body && req.body.id && req.body.new) {
    await MealTime.findByIdAndUpdate(req.body.id, req.body.new, { new: true })
      .then((mealtime) => {
        res.status(404).json(mealtime);
      })
      .catch((err) => {
        res.status(404).json({
          message: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: "Not Argumnents",
    });
  }
});
router.delete("/", async (req, res) => {
  if (req.body && req.body.id) {
    await MealTime.findByIdAndDelete(req.body.id)
      .then(() => {
        res.status(200).json({ message: "Ok" });
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  }
});

module.exports = router;
