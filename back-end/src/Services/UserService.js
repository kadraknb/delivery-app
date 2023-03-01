const validate = require('../utils/validate/userValidate');

module.exports = class UserService {
  constructor(model) {
    this.model = model;
  }

  async getUserEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async login(email, password) {
    const verifyUserExist = await this.getUserEmail(email);
    validate.verifyLogin(email, password, verifyUserExist);
  }
};