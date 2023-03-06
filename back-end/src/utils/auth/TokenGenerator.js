const jwt = require('jsonwebtoken');
const { readFile } = require('fs/promises');
const path = require('path');

module.exports = class TokenGenerator {
  static async generateToken(user) {
    const payload = {
      name: user.name,
      email: user.email,
    };

    const secretPath = path.resolve(__dirname, '../../../', 'jwt.evaluation.key');
    const secret = await readFile(secretPath, 'utf8');

    return jwt.sign(
      payload,
      secret,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
  }
};