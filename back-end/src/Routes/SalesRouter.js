const { Router } = require('express');
const SalesFactory = require('../Factory/SalesFactory');

const SalesRouter = Router();

SalesRouter.get('/customer/orders/:id', (req, res, next) =>
  SalesFactory.getAllSalesbyUserId(req, res, next));

SalesRouter.get('/seller/orders/:id', (req, res, next) =>
  SalesFactory.getAllSalesbySellerId(req, res, next));


SalesRouter.post('/sales', (req, res, next) =>
  SalesFactory.createSales(req, res, next));

SalesRouter.put('/sales/detail/:id', (req, res, next) =>
  SalesFactory.changeStateOfSaleById(req, res, next));

module.exports = SalesRouter;
