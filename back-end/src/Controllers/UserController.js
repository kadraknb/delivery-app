module.exports = class UserController {
  constructor(service) {
    this.service = service;
  }

  async getAllUsers(_req, res, next) {
    try {
      const allUsers = await this.service.getAllUsers();
      return res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
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

  async getUserByRoleSeller(_req, res, next) {
    try {
      const seller = await this.service.getUserByRoleSeller();
      return res.status(200).json(seller);
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

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.sercice.deleteUser(id);

      return res.status(204);
    } catch (error) {
      next(error);
    }
  }
};