const mongoose= require('mongoose');
const dashboard= new mongoose.Schema({
    request_id: {
        type: String,
        required: true,
    },
    support_agent: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, {timestamps: true});
module.exports = mongoose.model('Dashboard', dashboard);
