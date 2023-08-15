'use strict';

const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.patch('/confirm/:user_id', UserController.confirmUser);
router.get('/unconfirmed/list', UserController.getUnconfirmedUsers);
router.get('/:user_id', UserController.getUser);
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);

module.exports = router;
