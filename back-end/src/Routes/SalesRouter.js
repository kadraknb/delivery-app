const { Router } = require('express');
const SalesFactory = require('../Factory/SalesFactory');

const SalesRouter = Router();

SalesRouter.post('/sales', (req, res, next) => SalesFactory.createSales(req, res, next));

module.exports = SalesRouter;