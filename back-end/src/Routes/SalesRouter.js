const { Router } = require('express');
const SalesFactory = require('../Factory/SalesFactory');
// const validateToken = require('../middlewares/validateToken');
const TokenGenerator = require('../utils/auth/TokenGenerator');

const SalesRouter = Router();

SalesRouter.post('/sales', TokenGenerator.validateToken, (req, res, next) => 
SalesFactory.createSales(req, res, next));

SalesRouter.get(
  '/customer/orders',
  (req, res, next) => SalesFactory.getAllSales(req, res, next),
);

module.exports = SalesRouter;