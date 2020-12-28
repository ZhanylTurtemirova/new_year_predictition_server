const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isGift: {
    type: Boolean,
    required: true,
  },
});
module.exports = model("User", schema);
