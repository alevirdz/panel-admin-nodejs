const express = require('express');
const router = express.Router();
const PasswordRecoveryController = require('../core/controllers/PasswordRecoveryController');
const verifySesion = require('../core/middleware/authMiddleware');


router.post('/', PasswordRecoveryController.generateRecoveryLink);
router.post('/resetPasswordByLink', PasswordRecoveryController.resetPasswordByLink);
router.post('/resetPassword', verifySesion, PasswordRecoveryController.resetPassword);

module.exports = router;
