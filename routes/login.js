const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users");

router.post("/login",  async (req, res) => {
  try {
    const email= req.body.login_email;
    const password= req.body.login_password;
    console.log(`${email} ${password}`) 
    //check if user already exists
    const user_collection = await User.findOne({ email: req.body.login_email });
    console.log(user_collection);
    if (!user_collection)
      return res
        .status(400)
        .json({ message: "User does not exist. Please register first." });

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.login_password,user_collection.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    //create and assign token
    const token = jwt.sign(
      {
        _id: user_collection._id,
        name: user_collection.name,
      },
      process.env.jwt_Secret,
      {
        algorithm: "HS256",
      }
    );

    //SET TOKEN IN COOKIE
    res.cookie("token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.setHeader("x-auth-token", token);
    res.cookie("auth-token", token);
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(400).json({ message: "Login failed", message: error.message });
  }
});

//validate user for login
async function validateUser(req, res, next) { 
  const { login_email, login_password } = req.body;

  //check if all fields are filled
  if (
    login_email === "" ||
    login_password === "" ||
    login_email === undefined ||
    login_password === undefined ||
    login_email === null ||
    login_password === null
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check if email is valid
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(login_email))
    return res.status(400).json({ message: "Email is not valid" });

  //check if password is VALID OR NOT
  if (req.body.login_password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
      status: "warning",
    });
  }
  next();
}

module.exports = router;
