const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isGift: {
    type: Boolean,
    required: false,
  },
});
module.exports = model("User", schema);
