const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const multer = require("multer");
const path = require("path");

const routesAuth = require("./src/routes/auth");
const routesBlog = require("./src/routes/blog");

// cors orogin tanpa package
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// mengatur penyimpanan file dan nama file
// const fileStorage = multer.diskStorage({
//   // tempat menyimpan fle
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime() + "-" + file.originalname);
//   },
// });

// filter file yang diupload
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.use(bodyParser.json());

// app.use(
//   multer({
//     storage: fileStorage,
//     fileFilter: fileFilter,
//   }).array("image")
// );

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/v1/auth", routesAuth);
app.use("/v1/blog", routesBlog);

app.use((error, req, res, next) => {
  // tampung data dari throw error controller
  const status = error.errorStatus;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb+srv://wiby:masterofcad@cluster0.zneu2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("Sudah Konek dan Tidak Ada Masalah"));
  })
  .catch((err) => console.log(err));
