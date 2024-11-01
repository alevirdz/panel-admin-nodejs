const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const galleryUpload = require('../util/FileUpload');

router.post('/', galleryController.index);

//To CRUD
router.get('/id/:id', galleryController.getImageById);
router.get('/getAll', galleryController.getAllImages);
router.post('/upload', galleryUpload.single('image'), galleryController.addImage);
router.put('/image/:id', galleryController.updateImage);
router.delete('/deleteImage/:id', galleryController.deleteImage);

module.exports = router;