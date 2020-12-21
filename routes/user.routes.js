const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (name.length < 2) {
      return res.status(400).json({
        message: "Неверные данные",
      });
    }
    const conditate = await User.findOne({ name });
    if (conditate) {
      return res.status(400).json({ message: "Уже учавствовали" });
    }
    const user = new User({ name });
    await user.save();
    res.status(201).json({ message: "Пользователь создался" });
  } catch (e) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
