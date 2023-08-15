'use strict';

const express = require('express');
const TractorController = require('../controllers/tractor.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

// Sign up router
router.get('/', TractorController.getAllTractors);

router.use(isAuthenticated);
router.post('/', isAdmin, TractorController.createTractor);

module.exports = router;
