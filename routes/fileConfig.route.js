'use strict';

const express = require('express');
const FileConfigController = require('../controllers/fileConfig.controller');
const router = express.Router();
const upload = require('../configs/multer.config');
const upLoadContent = require("../configs/multer_content.config")
const upload1 = upLoadContent.single('image')
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
//const { upLoadContent, checkFileCompleteness } = require("../configs/multer_content.config");
const checkFileSize = require('../middlewares/checkUploadComplete')


//const checkDiskSpaceMiddleware = require('../middlewares/checkdisk')
//const Recycle = require("../configs/recycle_multer")
//router.use(isAuthenticated);
// Sign up router
function progress_middleware(req, res, next) {
    try {
        //console.log()
        req.Filesize = req.query.filesize
        next()
    } catch (error) {
        console.error("Error in middleware:", error);
        res.status(500).send("Internal Server Error");
    }
}


router.post('/upload', progress_middleware, upload1, FileConfigController.createFileConfig);
//router.post('/upload', progress_middleware, upLoadContent.single('image'), FileConfigController.createFileContent);


router.post('/', upload.single('fileConfig'), FileConfigController.createFileConfig);
router.get('/', FileConfigController.getAllFileConfigs);
router.delete('/:file_id', FileConfigController.deleteFileConfig);


router.get('/free_space', FileConfigController.checkSpaceOnDisk);
router.post('/recycle/:filename', FileConfigController.Recycle);
router.post('/recycle', FileConfigController.MultiRecycle);
router.post('/restore/:filename', FileConfigController.Restore);
router.post('/restore', FileConfigController.MultiRestore);
router.get('/file_image_by_size', FileConfigController.getAllImagesBySize);
router.get('/file_image_by_date', FileConfigController.getImagesGroupedByDate);
router.get('/recycle_by_size', FileConfigController.getAllRecycleBySize);
router.get('/recycle_by_date', FileConfigController.getAllRecycleByDate);
router.get('/get-image', FileConfigController.getFileImage);
router.get('/get-recycle', FileConfigController.getFileRecycle);
router.delete('/delete/delete-multi', FileConfigController.deleteMultiImage);
router.delete('/delete/:fileName', FileConfigController.deleteImage);


module.exports = router;
