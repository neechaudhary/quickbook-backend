const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true

    },
    to:{
        type: String,
        required: true
    },
    debit:{
        type: Number,
        required: true
    },
    credit:{
        type: Number,
        required: true
    },
    narration:{
        type: String,
    }
},{timestamps: true});

module.exports= mongoose.model('Journal', journalSchema);