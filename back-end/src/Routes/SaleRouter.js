const { Router } = require('express');
const SaleFactory = require('../Factory/SaleFactory');

const SaleRouter = Router();

SaleRouter.get(
  '/customer/orders',
  (req, res, next) => SaleFactory.getAllSales(req, res, next),
);

module.exports = SaleRouter;