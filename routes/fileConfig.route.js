'use strict';

const express = require('express');
const FileConfigController = require('../controllers/fileConfig.controller');
const router = express.Router();
const upload = require('../configs/multer.config');
const upLoadContent = require("../configs/multer_content.config")
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const Recycle = require("../configs/recycle_multer")
//router.use(isAuthenticated);
// Sign up router
router.post('/', upload.single('fileConfig'), FileConfigController.createFileConfig);
router.get('/', FileConfigController.getAllFileConfigs);
router.delete('/:file_id', FileConfigController.deleteFileConfig);
router.post('/upload', upLoadContent.single("image"), FileConfigController.createFileContent);
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
