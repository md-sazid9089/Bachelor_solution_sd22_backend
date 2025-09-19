const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ADMIN_EMAIL = 'sazid.cse.20230104062@aust.edu';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    if (!decoded.isAdmin || decoded.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }
    
    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user || user.email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    req.isAdmin = true;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = adminAuth;