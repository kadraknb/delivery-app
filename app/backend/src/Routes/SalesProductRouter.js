const { Router } = require('express');
const SalesProductFactory = require('../Factory/SalesProductFactory ');

const SalesProductRouter = Router();

SalesProductRouter.get(
  '/sales/products/:id',
  (req, res, next) => SalesProductFactory.getAllProductsWithSalesByUserId(req, res, next),
);

module.exports = SalesProductRouter;