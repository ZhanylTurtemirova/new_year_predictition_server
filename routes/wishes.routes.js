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
// router.post("/", async (req, res) => {
//   try {
//     const wishes = await Wish.find();
//     res.json(wishes);
//   } catch (e) {
//     res.status(500).json({ message: "something went wrong, try again" });
//   }
// });

module.exports = router;
