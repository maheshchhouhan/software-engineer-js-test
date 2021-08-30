const { model, Schema } = require("mongoose");

const imageSchema = new Schema({
  image: String,
  data: String,
  createdAt: String,
});

module.exports = model("Image", imageSchema);
