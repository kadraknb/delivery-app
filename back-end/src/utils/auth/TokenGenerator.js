const jwt = require('jsonwebtoken');

module.exports = class TokenGenerator {
  static generateToken(user) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return jwt.sign(
      payload,
      'secret_key',
      { algorithm: 'HS256', expiresIn: '7d' },
    );
  }
};