const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    mobile_number: {
        type: String,
        unique: true,
    },
    otp: {
        type: String,
        default: ""
    },
    confirmation_code_expiry: {
        type: Date,
        default: ""
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
    },
    role: {
        type: String,
        default: "user"
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["not_verified", "verified"],
        default: "not_verified"
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

module.exports = mongoose.model('USER', userSchema);