const cartSchema = require('../schema/cart.schema');
const { status, message, getResponseStructure } = require('../utils/response.utils');

exports.addCartProduct = async (req, res) => {
    try {
        const cart = new cartSchema({
            user_id: req.user._id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        });
        await cart.save();
        return res
            .status(status.successCreated)
            .send(
                getResponseStructure(
                    status.successCreated,
                    message.addedCartSuccess,
                    cart
                )
            );
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};