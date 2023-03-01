module.exports = class UserController {
  constructor(service) {
    this.service = service;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      await this.service.login(email, password);
      return res.status(200).json('login successful');
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      await this.service.createUser(req.body);
      return res.status(201).json('Register successful');
    } catch (error) {
      next(error);
    }
  }
};