'use strict';

const express = require('express');
const UserController = require('../controllers/user.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/', UserController.createUser);
router.use(isAuthenticated);

router.patch('/assign-tractors-to-user', isAdmin, UserController.asignTractorsToUser);
router.patch('/unconfirm/:user_id', isAdmin, UserController.unconfirmedUser);
router.patch('/confirm/:user_id', isAdmin, UserController.confirmUser);
router.get('/unconfirmed/list', isAdmin, UserController.getUnconfirmedUsers);
router.patch('/restore/:user_id', isAdmin, UserController.restoreUser);
router.get('/deleted/list', isAdmin, UserController.getDeletedUsers);
router.delete('/:user_id', isAdmin, UserController.deleteUser);
router.put('/:user_id', UserController.updateUser);
router.get('/:user_id', UserController.getUser);
router.get('/', isAdmin, UserController.getAllUsers);
router.post('/edit', isAdmin, UserController.editPage);
router.post('/update', isAdmin, UserController.updateContent);
router.delete('/delete/:id', isAdmin, UserController.deleteContent);
router.post('/storeJSON', isAdmin, UserController.storeDesignJSON);

module.exports = router;
