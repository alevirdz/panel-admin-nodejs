const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.index);

//To CRUD
router.get('/catalogo', productController.getCatalogo);
router.post('/agregarCatalogo', productController.addCatalogo);
router.delete('/eliminarCatalogo/:id', productController.deleteCatalogo);

module.exports = router;