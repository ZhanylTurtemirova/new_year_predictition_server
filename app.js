const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/wishes", require("./routes/wishes.routes"));
app.use("/api/mail", require("./routes/mail.routes"));
app.use("/api/users", require("./routes/user.routes"));

async function start() {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`app has been started on PORT ${PORT}`);
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}
start();
