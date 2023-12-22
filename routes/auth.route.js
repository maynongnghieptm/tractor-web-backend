'use strict';

const express = require('express');
const AuthController = require('../controllers/auth.controller');
const UserController = require("../controllers/user.controller")
const router = express.Router();

// Sign up router
router.post('/login', AuthController.logIn);
router.get('/findUser/:user_username', AuthController.findUser);
router.get('/findUser/:user_username/:user_email', AuthController.findEmail);
router.put('/changepassword/:username', AuthController.changePassword);
router.get('/editcontent', UserController.geteditPage);
router.get('/admin_edit', UserController.getAdmineditPage);
router.get('/infomation', UserController.getAllDoc);
module.exports = router;
