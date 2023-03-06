// const TokenGenerator = require('../utils/auth/TokenGenerator');
/* const { readFile } = require('fs/promises');
const path = require('path');

const secretPath = path.resolve(__dirname, '../../../', 'jwt.evaluation.key');
const secret = readFile(secretPath, 'utf8'); */

module.exports = validateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'token not faund' });
    }

    const secret = 'secret_key'

    jwt.verify(token, secret);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}