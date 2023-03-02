const md5 = require('md5');
const Validate = require('../utils/validate/userValidate');
const TokenGenerator = require('../utils/auth/TokenGenerator');

module.exports = class UserService {
  constructor(model) {
    this.model = model;
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async login(email, password) {
    const user = await this.getUserByEmail(email);
    Validate.verifyLogin(email, password, user);

    return {
      name: user.name,
      email,
      role: user.role,
      token: TokenGenerator.generateToken(user),
    };
  }

 async createUser(user) {
    const verifyUserExist = await this.getUserByEmail(user.email);
    Validate.validCreateUser(verifyUserExist, user);

    const hashMD5 = md5(user.password);
    
    const { password: _, ...data } = user;
    const newUser = await this.model.create({ ...data, password: hashMD5 });

    return {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: TokenGenerator.generateToken(newUser),
    };
   }
};