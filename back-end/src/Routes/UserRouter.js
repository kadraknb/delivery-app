const { Router } = require('express');
const UserFactory = require('../Factory/UserFactory');

const UserRouter = Router();

UserRouter.post('/login', (req, res, next) => UserFactory.login(req, res, next));
// UserRouter.post('/register', Factory);

module.exports = UserRouter;