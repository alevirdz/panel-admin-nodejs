const express = require('express');
const router = express.Router();
const PasswordRecoveryController = require('../core/controllers/PasswordRecoveryController');

router.post('/', PasswordRecoveryController.generateRecoveryLink);
router.post('/resetPassword', PasswordRecoveryController.resetPassword);

module.exports = router;
