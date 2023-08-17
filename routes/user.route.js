'use strict';

const express = require('express');
const UserController = require('../controllers/user.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(isAuthenticated);

router.patch('/confirm/:user_id', isAdmin, UserController.confirmUser);
router.get('/unconfirmed/list', isAdmin, UserController.getUnconfirmedUsers);
router.delete('/:user_id', isAdmin, UserController.deleteUser);
router.put('/:user_id', isAdmin, UserController.updateUser);
router.get('/:user_id', isAdmin, UserController.getUser);
router.get('/', isAdmin, UserController.getAllUsers);
router.post('/', isAdmin, UserController.createUser);

module.exports = router;
