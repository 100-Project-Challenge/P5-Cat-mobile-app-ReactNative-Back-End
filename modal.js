const mongoose = require("mongoose");

const catsSchema = new mongoose.Schema({
  name: String,
  breed: String,
  description: String,
  img: String,
  age: String
});

const catModel = mongoose.model("cat", catsSchema);

module.exports = catModel;
