'use strict';

const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

// Sign up router
router.post('/login', AuthController.logIn);

module.exports = router;
