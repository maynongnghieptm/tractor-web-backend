'use strict';

const express = require('express');
const FileConfigController = require('../controllers/fileConfig.controller');
const router = express.Router();
const upload = require('../configs/multer.config');

// Sign up router
router.post('/', upload.single('fileConfig'), FileConfigController.createFileConfig);

module.exports = router;
