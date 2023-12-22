'use strict';

const express = require('express');
const FileConfigController = require('../controllers/fileConfig.controller');
const router = express.Router();
const upload = require('../configs/multer.config');
const upLoadContent = require("../configs/multer_content.config")
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

router.use(isAuthenticated);
// Sign up router
router.post('/', isAdmin, upload.single('fileConfig'), FileConfigController.createFileConfig);
router.get('/', isAdmin, FileConfigController.getAllFileConfigs);
router.delete('/:file_id', isAdmin, FileConfigController.deleteFileConfig);
router.post('/upload',isAdmin, upLoadContent.single("image"), FileConfigController.createFileContent )
module.exports = router;
