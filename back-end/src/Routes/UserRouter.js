const { Router } = require('express');
const factory = require('../Factory/UserFactory');

const UserRouter = Router();
const UserFactory = new factory();

UserRouter.post('/login', UserFactory);
UserRouter.post('/register', UserFactory);

module.exports = UserRouter;