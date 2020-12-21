const { Router } = require("express");
const Wish = require("../models/Wish");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const wishes = await Wish.find();
    res.json(wishes);
  } catch (e) {
    res.status(500).json({ message: "something went wrong, try again" });
  }
});

router.patch("/:id", async (req, res) => {
  // const updates = Object.keys(req.body);
  // const allowedUpdates = ["count"];
  // const isValidOperation = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );

  // if (!isValidOperation) {
  //   return res.status(400).send("Invalid updates!");
  // }
  try {
    const wish = await Wish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wish) {
      return res.status(404).send();
    }
    res.status(201).send(wish);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
