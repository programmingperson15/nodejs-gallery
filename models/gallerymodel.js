const mongoose = require("mongoose");

const galleryschema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
});
module.exports = new mongoose.model("Image", galleryschema);
