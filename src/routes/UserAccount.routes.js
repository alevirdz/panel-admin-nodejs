const express = require('express');
const router = express.Router();
const UserAccountController = require('../core/controllers/UserAccountController');


router.get('/user/:id', UserAccountController.userAccountById);
router.post('/create', UserAccountController.createAccountUser);
router.post('/update', UserAccountController.updateAccountUser);
router.post('/delete', UserAccountController.deleteAccountUser);
router.get('/all', UserAccountController.allAccounts);

module.exports = router;