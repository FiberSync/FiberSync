const express = require('express');
const router = express.Router();
const regUser = require('../controllers/signUp.js');
const logAuth = require('../controllers/login.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('../middlewares/auth');

/* GET users listing. */
router.post('/signup',regUser.RegisterUser);

router.post('/login', logAuth.LoginAuth);


module.exports = router;
