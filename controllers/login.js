
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id, email: user.email,orgName: user.orgName }, process.env.JWT_SECRET, {
        expiresIn: '2h', 
      });
  
      res.status(200).json({orgName: user.orgName , message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

module.exports = {
    LoginAuth: auth
}