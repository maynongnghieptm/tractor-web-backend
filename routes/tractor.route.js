'use strict';

const express = require('express');
const TractorController = require('../controllers/tractor.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

// Sign up router

router.use(isAuthenticated);
router.get('/', TractorController.getAllTractors);
router.get('/:tractorId', TractorController.getTractor);
router.post('/', isAdmin, TractorController.createTractor);
router.put('/:tractorId', isAdmin, TractorController.updateTractor);
router.delete('/:tractorId', isAdmin, TractorController.deleteTractor);

module.exports = router;
