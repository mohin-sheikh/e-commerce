const validate = require('./schema/product.schema');

exports.addProduct = (req, res, next) => {
    try {
        const { value, error } = validate.addProduct.validate(req.body);
        if (error) {
            return res.send({
                status: 400,
                message:
                    'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
                response: {},
            });
        }
        req.body = value;
        next();
    } catch (e) {
        return res.send({ error: e.message.toString() });
    }
};
