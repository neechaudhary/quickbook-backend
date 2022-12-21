const mongoose = require('mongoose');
 const notice_board= new mongoose.Schema({
        notice_title: {
            type: String,
            required: true,
        },
        notice_date: {
            type: Date,
            default: Date.now,
        },
        notice_body : {
            type: String,
            required: true,
        },
    }, {timestamps: true});
    module.exports = mongoose.model('Notice_board', notice_board);