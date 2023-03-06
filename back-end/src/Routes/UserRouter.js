const { Router } = require('express');
const UserFactory = require('../Factory/UserFactory');

const UserRouter = Router();

UserRouter.post('/login', (req, res, next) => UserFactory.login(req, res, next));

UserRouter.post('/register', (req, res, next) => UserFactory.createUser(req, res, next));

UserRouter.get('/seller', (req, res, next) => UserFactory.getUserByRoleSaller(req, res, next));

module.exports = UserRouter;