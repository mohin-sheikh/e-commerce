const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT"
    },
    quantity: {
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

module.exports = mongoose.model('CART', cartSchema);