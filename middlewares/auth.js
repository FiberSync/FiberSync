const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // Retrieve token from headers
  const token = req.query.token;
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Extract email and orgName from decoded token and attach to req object
    req.email = decoded.email;
    req.orgName = decoded.orgName;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;
