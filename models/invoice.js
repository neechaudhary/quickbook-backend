const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoice_number: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    recepient: {
        type: String,
        required: true,
    },
    invoice_date: {
        type: Date,
        default: Date.now,
    },
    due_date: {
        type: Date,
        default: Date.now,
    },
    pyament_method: {
        type: String,
        required: true,
    },
}, {timestamps: true});
module.exports = mongoose.model('Invoice', invoiceSchema);
   

