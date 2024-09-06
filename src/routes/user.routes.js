const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/', userController.getUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);


module.exports = router;