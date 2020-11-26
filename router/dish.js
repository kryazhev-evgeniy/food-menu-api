const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

router.get("/", async (req, res) => {
  const dishes = await Dish.find({});
  if (dishes) {
    res.status(200).json(dishes);
  } else {
    res.status(404).json({
      message: "Not dishes",
    });
  }
});
router.post("/", async (req, res) => {
  if (req.body) {
    const dish = new Dish(req.body);
    await dish
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
    await Dish.findByIdAndUpdate(req.body.id, req.body.new, { new: true })
      .then((dish) => {
        res.status(404).json(dish);
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
    await Dish.findByIdAndDelete(req.body.id)
      .then(() => {
        res.status(200).json({ message: "Ok" });
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  }
});

module.exports = router;
