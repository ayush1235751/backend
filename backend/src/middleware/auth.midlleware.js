const  jwt = require('jsonwebtoken')
const usermodel = require('../models/user.model')
const tokenblacklistModel = require('../models/blacklist.model.js')
 

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const blacklisted = await tokenblacklistModel.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: 'Token has been revoked' });
    }

    const decoded = jwt.verify(token, "tF2sP5qmGYMx0jAaR65q5gJXGh4RuNDU");
    const user = await usermodel.findById(decoded.UserID).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
}


module.exports ={
  authUser
} 