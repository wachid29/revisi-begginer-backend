const express = require("express");
const multer = require("multer");
const app = express();
// app = express.createServer();
require("dotenv").config();
const port = 8001;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require("./db");
const path = require("path");

app.use(helmet());

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // file size < 1MB
});

app.use("/images", express.static("images"));

app.post("/recipe/add", upload.single("image"), (req, res) => {
  const image = `http://localhost:8001/images/${req.file.path}`;
  if (req.file) {
    console.log(req.file.path);
  }
  console.log(req.file.path);
  const { title_recepy, ingredients, vidio_step, user_id } = req.body;
  // if ((error = password !== confirm_pass)) {
  //   res.status(400).json("pass harus sama");
  // }
  db.query(
    `INSERT INTO recepy (title_recepy,image,ingredients,vidio_step,user_id) 
    VALUES ($1,$2,$3,$4,$5)`,
    [title_recepy, image, ingredients, vidio_step, user_id],
    (error, result) => {
      if (error) {
        console.log(error);
        console.log(error);
        res.status(400).send("ada yang error");
      } else {
        console.log(req.file.path);
        res.status(200).send("data berhasil di tambah");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Fighting!!`);
});
