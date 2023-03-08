const { Router } = require('express');
const UserFactory = require('../Factory/UserFactory');
const TokenGenerator = require('../utils/auth/TokenGenerator');

const AdminRouter = Router();

const endpoint = '/admin/manage';

AdminRouter.post(
  endpoint,
  TokenGenerator.validateToken,
  (req, res, next) => UserFactory.createUser(req, res, next),
);

AdminRouter.get(
  endpoint,
  (req, res, next) => UserFactory.getAllUsers(req, res, next),
);

AdminRouter.delete(
  `${endpoint}/:id`,
  TokenGenerator.validateToken,
  (req, res, next) => UserFactory.createUser(req, res, next),
);

module.exports = AdminRouter;