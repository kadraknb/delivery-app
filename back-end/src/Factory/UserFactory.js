const { User } = require('../database/models');
const UserService = require('../Services/UserService');
const UserController = require('../Controllers/UserController');

module.export = class UserFactory {
  factory() {
    this.service = new UserService(User);
    this.controller = new UserController(this.service);
    
  return this.controller;
  }
};