'use strict';

const express = require('express');
const FieldController = require('../controllers/field.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

// Sign up router

//router.use(isAuthenticated);
router.post('/createfield', FieldController.createField);
router.get('/get_all_fields', FieldController.getAllFields);
router.get('/get_fields_byId', FieldController.getFieldById);
router.put('/update_field', FieldController.updateField);
router.delete('/delete', FieldController.deleteField);

module.exports = router;
