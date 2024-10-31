const mongoose = require('mongoose');
require("dotenv").config();

async function connectDB() {
    try{
      const db = await mongoose.connect(process.env.DB_CONNECTION);  
      console.log("MongoDB Connected");
      console.log("---------------------------------------------");
    }catch(e){
      console.log(e);}
  }

module.exports = connectDB