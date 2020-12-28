const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, text, isGift } = req.body;
    if (name.length < 2) {
      return res.status(400).json({
        message: "Неверные данные",
      });
    }
    const conditate = await User.findOne({ name });
    if (conditate) {
      return res.status(400).json({ message: "Уже учавствовали" });
    }
    const user = new User({ name, text, isGift });
    await user.save();
    res.status(201).json({ message: "Пользователь создался" });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.patch("/:name", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
