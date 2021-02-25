const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/products', productController.getProduct);
router.post('/product', productController.createProduct);

module.exports = router;