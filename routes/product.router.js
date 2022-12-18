const express = require('express');
express.Router();
const api = require('../controller/product.controller');
const validator = require('../validator/product.validator');

module.exports = (router) => {
    router.post('/product/register', validator.addProduct, api.addProduct);
    return router;
};