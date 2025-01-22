const express = require('express');
const router = express.Router();
const ThemesController = require('../../core/controllers/ThemesController');
const verifySesion = require('../../core/middleware/authMiddleware');



router.get('/get-current-theme', ThemesController.getUserTheme);
router.get('/all', ThemesController.getAllThemes);
router.post('/update-theme', verifySesion, ThemesController.updateUserTheme);
module.exports = router;
