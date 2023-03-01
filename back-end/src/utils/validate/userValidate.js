const md5 = require('md5');
const SchemaJoi = require('./schemaJoi');
const { NotFound, BadRequest, Conflict } = require('../errors');

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

  static validCreateUser(verifyUserExist, user) {
    const { error } = SchemaJoi.createUserSchema.validate(user);
    console.log(error.details);
    if (error) {
      throw new BadRequest(error.details[0].message);
    }

    const { email, name } = verifyUserExist;
    if (email === user.email || name === user.name) {
      throw new Conflict('user exist');
    }
  }
};