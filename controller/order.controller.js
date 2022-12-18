const orderSchema = require('../schema/order.schema');
const { status, message, getResponseStructure } = require('../utils/response.utils');

exports.orderProduct = async (req, res) => {
    try {
        const order = new orderSchema({
            user_id: req.user._id,
            product_id: req.body.product_id,
            total: req.body.total,
            sub_total: req.body.sub_total,
            delivery_charges: req.body.delivery_charges,
            GST: req.body.GST,
            SGST: req.body.SGST,
            CGST: req.body.CGST,
            discount: req.body.discount,
            shipping_and_handling: req.body.shipping_and_handling,
        });
        await order.save();
        return res
            .status(status.successCreated)
            .send(
                getResponseStructure(
                    status.successCreated,
                    message.orderSuccess,
                    order
                )
            );
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};