'use strict';

const express = require('express');
const CommandController = require('../controllers/command.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(isAuthenticated);
// Sign up router
router.post('/', CommandController.sendCommand);

module.exports = router;
