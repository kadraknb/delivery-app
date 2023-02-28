const { User } = require('../database/models');
const UserService = require('../Services/UserService');
const UserController = require('../Controllers/UserController')

module.export = class UserFactory {
  
  factory = () => {
    const service = new UserService(User);
    const controller = new UserController(service);
  return controller;
  }
}