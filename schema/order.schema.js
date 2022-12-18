const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT"
    },
    total: {
        type: Number,
    },
    sub_total: {
        type: Number,
    },
    delivery_charges: {
        type: Number,
    },
    order_status: {
        type: String,
        enum: ['ordered', 'delivered', 'shipping', 'out of delivery'],
        default: 'ordered'
    },
    // For the address part i considered only one address of user.
    address: {
        type: mongoose.Schema.Types.String,
        ref: "USER"
    },
    GST: {
        type: Number,
    },
    CGST: {
        type: Number,
    },
    SGST: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    shipping_and_handling: {
        type: Number,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ORDER', orderSchema);