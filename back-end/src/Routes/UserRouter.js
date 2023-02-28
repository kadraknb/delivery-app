const { Router } = require('express');
const UserFactory = require('../Factory/UserFactory');

const UserRouter = Router();
const Factory = new UserFactory();

UserRouter.post('/login', Factory);
UserRouter.post('/register', Factory);

module.exports = UserRouter;