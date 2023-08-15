const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/file-config/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        if(file.mimetype === 'text/plain') {
            cb(null, file.fieldname + '-' + uniqueSuffix + '.txt');
        } else if(file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
        } else if(file.mimetype === 'image/png') {
            cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
        }
    } 
});
const fileFilter = (req, file, cb) => {
    // Set the desired MIME type (e.g., 'image/jpeg') for your file
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'text/plain'];
  
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;