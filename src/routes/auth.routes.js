const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuth.controller');

router.post('/signin', userAuthController.signin);
router.post('/register', userAuthController.register);

module.exports = router;