const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/users');

const RegisterUserController = async(req, res)=>{
    const { orgName, email, password } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ email });
      //if email already exists
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new UserModel({
        orgName,
        email,
        password: hashedPassword,
      });
  
      // Save user to database
      await newUser.save();
  
      // Respond with success message
      res.status(201).json({ message: "You are successfully Signed up!" });
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ message: "Error in Registeration" });
    }
  }




module.exports = {
    RegisterUser : RegisterUserController
};
