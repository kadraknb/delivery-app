require('dotenv').config();
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');


const secret = process.env.JWT_SECRET

module.exports = class TokenGenerator {
  static generateToken(user) {
    const payload = {
      name: user.name,
      email: user.email,
    };
    
    return jwt.sign(
      payload,
      secret,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
  }

  static validateToken(req, res, next) {
    try {  
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({ message: 'token not faund' });
      }
  
      jwt.verify(token, secret);
  
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
};