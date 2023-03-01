const { User } = require('../database/models');
const UserService = require('../Services/UserService');
const UserController = require('../Controllers/UserController');

const service = new UserService(User);
const controller = new UserController(service);

module.exports = controller;