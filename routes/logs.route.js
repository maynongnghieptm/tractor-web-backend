'use strict';

const express = require('express');
const LogsController = require('../controllers/logs.controller');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

router.use(isAuthenticated);
// Sign up router
router.get('/', isAdmin, LogsController.getAllLogs);

module.exports = router;
