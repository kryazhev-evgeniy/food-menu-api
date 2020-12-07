const express = require("express");
const router = express.Router();
const DayDish = require("../models/DayDish");
const MealTime = require("../models/MealTime");
const Dish = require("../models/Dish");
const xlsx = require("node-xlsx");
const fs = require("fs");

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

router.get("/download/:id", async (req, res) => {
  if (req.params.id) {
    let data = [];
    const fillepath = `${__dirname}\\doc.xlsx`;

    const daydish = await DayDish.findById(req.params.id);
    console.log(daydish);

    data.push(["Меню", daydish.date]);
    for (let index = 0; index < daydish.mealTimes.length; index++) {
      const id_mealtime = daydish.mealTimes[index];
      let mealtime = await MealTime.findById(id_mealtime);
      let dishes_name = [];

      for (let i_dish = 0; i_dish < mealtime.dishes.length; i_dish++) {
        const element = mealtime.dishes[i_dish];
        let dish = await Dish.findById(element);
        dishes_name.push(dish.name);
      }

      console.log(mealtime.name);
      data.push([mealtime.name], dishes_name);
    }

    console.log(data);
    var buffer = xlsx.build([{ name: "mySheetName", data: data }]); // Returns a buffer
    fs.writeFileSync(fillepath, buffer);
    res.download(fillepath);
  } else {
    res.status(404).send("Not Params");
  }
});

module.exports = router;
