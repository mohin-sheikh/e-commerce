const Joi = require('joi');

exports.addCartProduct = Joi.object({
    product_id: Joi.string().required(),
    quantity: Joi.number().required(),
});
