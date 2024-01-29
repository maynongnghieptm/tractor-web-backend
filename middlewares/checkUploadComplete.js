const fs = require('fs');
const path = require('path');

const checkFileSize = (req, res, file, next) => {
    const maxSizeInBytes = 1024 * 1024; // Ví dụ: Giả sử kích thước tối đa là 1MB

    try {
        const receivedFileSize = req.file ? req.file.size : 0;
        const sentFileSize = parseInt(req.body.fileSize);

        console.log(receivedFileSize);
        console.log(sentFileSize);
    } catch (error) {
        console.log(error)
    }
    next();
};
module.exports = checkFileSize;
