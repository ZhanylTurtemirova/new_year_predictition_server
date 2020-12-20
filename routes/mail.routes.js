const { Router } = require("express");
const config = require("config");
const nodemailer = require("nodemailer");

const router = Router();
const moderator = config.get("email");
const pass = config.get("password");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.mail.ru",
  auth: {
    user: `${moderator}`,
    pass: `${pass}`,
  },
  secure: true,
});

router.post("/", (req, res) => {
  const { text } = req.body;
  const mailData = {
    from: `${moderator}`,
    to: `${moderator}`,
    subject: "new year randomizer",
    text: text,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res
      .status(200)
      .send({ message: mailData.text, message_id: info.messageId });
  });
});
module.exports = router;
