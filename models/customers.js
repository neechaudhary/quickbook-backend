
const mongoose= require('mongoose');

const cust_Schema = new mongoose.Schema({
    cust_code: {
        type: String,
        required: true,
    },
    cust_name: {
        type: String,
        required: true,
    },
    telephone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Customer', cust_Schema);