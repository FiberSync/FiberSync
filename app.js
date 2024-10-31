const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./functions/connectdb.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const stripe = require("stripe")(process.env.Private_Api_Key);

const app = express();

// db-connection with mongodb
connectDB();


// ------------------------------------------------------------------------------------------
// Node:Mailer => Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fibersync.textile@gmail.com',
    pass: 'ckzb gwvs nmeh otzh'      
  }
});
// ------------------------------------------------------------------------------------------

//middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());

//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const paymentRouter = require('./routes/payment');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/payment', paymentRouter);


app.get('/sendIntroEmail', function(req, res) {
  let email = req.query.email;
  const mailOptions = {
    from: 'fibersync.textile@gmail.com',
    to: `${email}`,
    subject: 'Get started with FiberSync Textile SCM',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://i.ibb.co/fvdtMCx/fiber-Logo.png" alt="FiberSync Logo" style="max-width: 200px; height: auto;">
      </div>

      <!-- Welcome Message -->
      <h1 style="text-align: center; color: #191919;">Welcome to FiberSync Textile SCM</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        Dear Textile Partner,
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        We’re excited to introduce <strong>FiberSync</strong>, Pakistan's leading blockchain-based Supply Chain Management (SCM) platform tailored specifically for the textile industry. FiberSync offers unmatched traceability and transparency for every step in your supply chain, from raw materials to finished products, helping you build a reputation for quality,enhancing operational efficiency and trust in the textile market.
      </p>
      <h2 style="color: #191919; font-size: 20px; margin-top: 20px;">Why FiberSync?</h2>
      <ul style="font-size: 16px; line-height: 1.6; color: #555;">
        <li><strong>Enhanced Traceability:</strong> Our blockchain technology ensures every fiber’s journey is recorded, providing transparent and secure data for all stakeholders.</li>
        <li><strong>Real-time Data Management:</strong> Monitor spinning, weaving, dyeing, and manufacturing processes as they happen, giving you insights to optimize and improve.</li>
        <li><strong>Subscription Packages for SMEs:</strong> Special packages are available for small and medium enterprises (SMEs) to make cutting-edge SCM accessible, affordable, and scalable.</li>
        <li><strong>Industry-Specific Solutions:</strong> Designed for the unique needs of Pakistan’s textile sector, FiberSync is ready to help you meet both local and global standards.</li>
      </ul>
      <p style="font-size: 16px; line-height: 1.6; color: #555;">
        FiberSync offers tailored subscription packages to meet your company's unique needs. Take advantage of the latest in SCM technology to boost efficiency, secure supply chain data, and drive transparency, especially crafted for Pakistan's textile SMEs.
      </p>

      <!-- Get Started Button -->
      <div style="text-align: center; margin-top: 30px;">
        <a href="https://yourdomain.com/get-started" target="_blank" style="background-color: #39ff14; color: #191919; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-size: 18px; font-weight: bold; display: inline-block;">
          Choose Your Plan
        </a>
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; font-size: 14px; color: #777;">
        <p>Thank you for choosing FiberSync, your partner in transparent and efficient textile supply chain management.</p>
        <p>For more details, visit our website or contact us at fibersync.textile@gmail.com</p>
      </div>
    </div>
  `
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(200).json({ message: "Error Sending Email" });
      console.log(error);
    }
    res.status(200).json({ message: "Email is sent successfully" });;
  });
})


//error-handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

  app.get('/test', function(req, res){
    res.status(200).json({message: "Hello World"});
}); 


// app listen function
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
  console.log("---------------------------------------------");
});

// Export the app for testing purpose
module.exports = app;



