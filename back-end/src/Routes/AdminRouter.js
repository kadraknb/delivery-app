const { Router } = require('express');
const UserFactory = require('../Factory/UserFactory');
const TokenGenerator = require('../utils/auth/TokenGenerator');

const AdminRouter = Router();

AdminRouter.post(
  '/admin/manage',
  TokenGenerator.validateToken,
  (req, res, next) => UserFactory.createUser(req, res, next),
);

AdminRouter.get(
  '/admin/manage',
  (req, res, next) => UserFactory.getAllUsers(req, res, next),
);

module.exports = AdminRouter;