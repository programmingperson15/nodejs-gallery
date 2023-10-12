const express = require("express");
const app = express();
const multer = require("multer");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const gallerymodel = require("./models/gallerymodel");

app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/gallery")
  .then(() => {
    console.log("mongodb run");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const file_name = Date.now() + "-" + file.originalname;
    cb(null, file_name);
  },
});
const upload = multer({ storage: storage });
app.get("/", async (req, res) => {
  try {
    const getimages = await gallerymodel.find();
    console.log(getimages);
    res.render("fileupload", { data: getimages });
  } catch (err) {
    console.log(err);
  }
});
app.post("/", upload.single("file"), (req, res) => {
  try {
    const galleryimg = new gallerymodel({
      image: req.file.filename,
    });
    galleryimg.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(2000, function () {
  console.log("ok");
});
