'use strict';

const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

// Sign up router
router.post('/login', AuthController.logIn);
router.get('/findUser/:user_username', AuthController.findUser);
router.get('/findUser/:user_username/:user_email', AuthController.findEmail);
router.put('/changepassword/:username', AuthController.changePassword);
module.exports = router;
