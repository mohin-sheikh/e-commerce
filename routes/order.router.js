const express = require('express');
express.Router();
const api = require('../controller/order.controller');
const validator = require('../validator/order.validator');
const { verifyToken } = require("../middleware/middleware");

module.exports = (router) => {
    router.post('/order/add', verifyToken, validator.orderProduct, api.orderProduct);
    return router;
};