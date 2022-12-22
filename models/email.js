const bodyParser = require('body-parser');
var mongoose= require('mongoose');

const email_schema= new mongoose.Schema({
    email_to:{
        type: String,   
        required: true,
    },
    email_from:{
        type: String,
        required: true,
    },
    email_body:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports= mongoose.model("email", email_schema)