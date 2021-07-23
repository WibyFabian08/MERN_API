const multer = require("multer");

// mengatur penyimpanan file dan nama file
const fileStorage = multer.diskStorage({
  // tempat menyimpan fle
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// filter file yang diupload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadProfile = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

module.exports = uploadProfile;
