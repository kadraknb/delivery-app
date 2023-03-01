const Validate = require('../utils/validate/userValidate');

module.exports = class UserService {
  constructor(model) {
    this.model = model;
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async login(email, password) {
    const verifyUserExist = await this.getUserByEmail(email);
    Validate.verifyLogin(email, password, verifyUserExist);
  }
};