'use strict';

const express = require('express');
const router = express.Router();
const { validRequest } = require('../helpers/validator');
const { validations, createProduct, updateProduct, deleteProduct, findAllProduct, findOneProduct } = require('../controllers/product');

router.route('/:language/product')
    .post(validRequest(validations), createProduct)
    .get(findAllProduct);

router.route('/:language/product/:productId')
    .put(validRequest(validations), updateProduct)
    .delete(deleteProduct)
    .get(findOneProduct);

module.exports = router;