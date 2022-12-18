const express = require('express');
express.Router();
const api = require('../controller/cart.controller');
const validator = require('../validator/cart.validator');
const { verifyToken } = require("../middleware/middleware");

module.exports = (router) => {
    router.post('/cart/add', verifyToken, validator.addCartProduct, api.addCartProduct);
    return router;
};