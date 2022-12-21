const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');


router.post('/',validateUser, async (req, res) => {

    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.reg_password, salt);

    //create new user
    const user_collection= new User({
        name: req.body.reg_name,
        email: req.body.reg_email,
        password: hashedPassword,
        phone: req.body.reg_phone
    });
    try {
       await user_collection.save();
    res.send(user_collection);   
    } catch (error) {
        res.status(400).json({message:"User registration failed", message: error.message});
    }
  
});

//validation for registeration
async function validateUser(req,res,next) {
   
    //check if user already exists
    const user= await User.findOne({email: req.body.reg_email});
    if(user) return res.status(400).json({message:"User already exists, try with another email"});

    //check if all fields are filled
    const {reg_name, reg_email, reg_password, reg_phone} = req.body;

    if (reg_name === '' || reg_email === '' || reg_password === '' || reg_phone === '' ||
    reg_name === undefined || reg_email === undefined || reg_password === undefined || reg_phone === undefined ||
    reg_name === null || reg_email === null || reg_password === null || reg_phone === null)
   {
        return res.status(400).json({message:"All fields are required"});
    }   

    //check if password is strong
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if(!passwordRegex.test(reg_password)) return res.status(400).json({message:"Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"});

    //check if phone number is valid
    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(reg_phone)) return res.status(400).json({message:"Phone number must be 10 digits long"});

    //check if email is valid
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailRegex.test(reg_email)) return res.status(400).json({message:"Email is not valid"});

    //check if name is valid
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if(!nameRegex.test(reg_name)) return res.status(400).json({message:"Name is not valid"});

    next();

} 


module.exports = router;

