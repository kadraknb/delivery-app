module.exports = class UserController {
  constructor(service) {
    this.service = service;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const newUser = await this.service.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
};