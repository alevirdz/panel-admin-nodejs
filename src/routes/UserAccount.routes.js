const express = require('express');
const router = express.Router();
const UserAccountController = require('../core/controllers/UserAccountController');


router.get('/user/:id', UserAccountController.userAccountById);
router.post('/update', UserAccountController.updateUser);
router.post('/delete', UserAccountController.deleteUser);
router.get('/all', UserAccountController.allAccounts);

module.exports = router;