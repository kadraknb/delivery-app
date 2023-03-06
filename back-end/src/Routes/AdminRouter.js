const { Router } = require('express');
const UserFactory = require('../Factory/UserFactory');

const AdminRouter = Router();

AdminRouter.post('/admin/manage', (req, res, next) => UserFactory.createUser(req, res, next));

module.exports = AdminRouter;