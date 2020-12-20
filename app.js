const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const PORT = config.get("port") || 5000;
app.use("/api/wishes", require("./routes/wishes.routes"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
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
