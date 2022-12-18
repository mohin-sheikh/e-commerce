const productSchema = require('../schema/product.schema');
const { status, message, getResponseStructure } = require('../utils/response.utils');

exports.addProduct = async (req, res) => {
    try {
        const product = new productSchema({
            name: req.body.name,
            price: req.body.price,
            product_detail: req.body.product_detail,
            images: req.body.images,
        });
        await product.save();
        return res
            .status(status.successCreated)
            .send(
                getResponseStructure(
                    status.successCreated,
                    message.addedProductSuccess,
                    product
                )
            );
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};