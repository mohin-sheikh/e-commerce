const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    product_detail: {
        type: String,
    },
    images: {
        type: String,
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

module.exports = mongoose.model('PRODUCT', productSchema);