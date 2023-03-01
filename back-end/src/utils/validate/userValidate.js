const md5 = require('md5');
const SchemaJoi = require('./schemaJoi');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

module.exports = class Validate {
  static verifyLogin(email, password, verifyUserExist) {
    const { error } = SchemaJoi.loginSchema.validate({ email, password });
    if (error) {
      throw new NotFound(error.details[0].message);
    }

    if (!verifyUserExist) {
      throw new NotFound('user not exist');
    }

    const hashMD5 = md5(password);
    if (verifyUserExist.password !== hashMD5) {
      throw new BadRequest('incorrect password');
    }
  }
};