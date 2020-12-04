const express = require("express");
const router = express.Router();
const DayDish = require("../models/DayDish");
const MealTime = require("../models/MealTime");
const Dish = require("../models/Dish");

router.get("/", async (req, res) => {
  await DayDish.find({})
    .then(async (resp) => {
      let daydishes = resp;
      for (let index = 0; index < resp.length; index++) {
        daydishes[index].mealTimes = await MealTime.find({
          _id: { $in: resp[index].mealTimes },
        });

        for (let a = 0; a < daydishes[index].mealTimes.length; a++) {
          for (
            let x = 0;
            x < daydishes[index].mealTimes[a].dishes.length;
            x++
          ) {
            const _dishes = daydishes[index].mealTimes[a].dishes;
            daydishes[index].mealTimes[a].dishes = await Dish.find({
              _id: { $in: _dishes },
            });
          }
        }
      }

      res.status(200).json(daydishes);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
router.post("/", async (req, res) => {
  if (req.body) {
    await DayDish.create(req.body, (err, doc) => {
      if (err) {
        res.status(404).json({ message: "Not quaery body" });
      }
      res.status(200).json(doc);
    });
  } else {
    res.status(404).json({ message: "Not quaery body" });
  }
});
router.put("/", async (req, res) => {
  if (req.body.id && req.body.new) {
    await DayDish.findOneAndUpdate(
      req.body.id,
      req.body.new,
      { new: true },
      (err, doc) => {
        if (err) es.status(404).json(err);
        res.status(200).json(doc);
      }
    );
  } else {
    res.status(404).json({ message: "Not query params" });
  }
});
router.delete("/", async (req, res) => {
  if (req.body && req.body.id) {
    await DayDish.findByIdAndDelete(req.body.id, (err, doc) => {
      if (err) res.status(404).json(err);

      res.status(200).json({ message: "ok" });
    });
  } else {
    res.status(404).json({ message: "Not query params" });
  }
});

module.exports = router;
