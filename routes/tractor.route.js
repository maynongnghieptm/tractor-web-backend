'use strict';

const express = require('express');
const TractorController = require('../controllers/tractor.controller');
const router = express.Router();

// Sign up router
router.get('/', TractorController.getAllTractors);
router.post('/', TractorController.createTractor)

module.exports = router;
