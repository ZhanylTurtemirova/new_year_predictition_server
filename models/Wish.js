const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isGift: {
    type: Boolean,
    required: true,
  },
  count: {
    type: Number,
    required: false,
  },
});
module.exports = model("Wish", schema);
