require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // console.log('req',req.header);
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(decoded);
    console.log('req',req.body);
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;