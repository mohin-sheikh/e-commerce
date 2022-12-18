const Joi = require('joi');

exports.orderProduct = Joi.object({
    product_id: Joi.string().required(),
    total: Joi.number().required(),
    sub_total: Joi.number().required(),
    delivery_charges: Joi.number().required(),
    GST: Joi.number().required(),
    CGST: Joi.number().required(),
    SGST: Joi.number().required(),
    discount: Joi.number().required(),
    shipping_and_handling: Joi.number().required(),
});
