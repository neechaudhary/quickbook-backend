require('dotenv').config();
var mongoose= require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () =>{
    try {
      mongoose.connect(process.env.DB)
        console.log('MongoDB connected');
    } catch (error) {
        console.log("mongoDB connection failed")
        // console.log(error);
        // process.exit(1);
        
    }
}
module.exports = connectDB; 