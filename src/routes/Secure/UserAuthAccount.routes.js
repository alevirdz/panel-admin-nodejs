const express = require('express');
const router = express.Router();
const userAuthController = require('../../core/guard/userAuthController');

router.post('/signin', userAuthController.signin);
router.post('/logout', userAuthController.logout);

module.exports = router;