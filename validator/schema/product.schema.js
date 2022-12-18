const Joi = require('joi');

exports.addProduct = Joi.object({
    name: Joi.string().lowercase().trim().min(3).max(30).required(),
    price: Joi.number().required(),
    product_detail: Joi.string().min(3).max(300).trim().required(),
    images: Joi.string().trim().required(),
});
