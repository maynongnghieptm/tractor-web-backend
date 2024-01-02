const multer = require('multer');
const path = require("path");
const imageDirectory = 'D:/IMAGE/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDirectory);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const currentDate = new Date().toISOString().slice(0, 10);
    const filename = `${currentDate}_${Date.now()}${ext}`;
    cb(null, filename);
    console.log('File size:', file);
    console.log(filename)
    req.uploadedFileName = filename;
  },
});

const upLoadContent = multer({ storage: storage });
module.exports = upLoadContent
