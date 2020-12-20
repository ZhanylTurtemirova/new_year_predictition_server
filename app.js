const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = config.get("port") || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/wishes", require("./routes/wishes.routes"));
app.use("/api/mail", require("./routes/mail.routes"));
app.use("/api/users", require("./routes/user.routes"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
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
