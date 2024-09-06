const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuth.controller');

router.post('/', userAuthController.auth);
router.post('/register', userAuthController.register);

module.exports = router;