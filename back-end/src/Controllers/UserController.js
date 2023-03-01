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
};