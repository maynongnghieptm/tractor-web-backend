const multer = require('multer');
const path = require("path");
const imageDirectory = 'D:/IMAGE/';
const os = require("os");
const fs = require('fs');
//const disk = require('diskusage');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDirectory);
  },
  filename: function (req, file, cb) {
    //console.log(req)
    //console.log(file)
    //console.log(file)
    console.log(req.uploadedFileName)
    const file_size = req.Filesize;
    //console.log(file_size)
    const ext = path.extname(file.originalname);
    const currentDate = new Date().toISOString().slice(0, 10);
    const filename = `${currentDate}_${file_size}_${Date.now()}${ext}`;

    //console.log(filename)
    cb(null, filename);
    req.uploadedFileName = filename;
  },
});
//const size = multer.size()

const upLoadContent = multer({
  storage: storage,
});
//const upLoadContent = multer({ storage: storage, size: size });
module.exports = upLoadContent


