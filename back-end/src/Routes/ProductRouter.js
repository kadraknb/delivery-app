const { Router } = require('express');
const ProductFactory = require('../Factory/ProductFactory');

const ProductRouter = Router();

ProductRouter.get('/customer/products', (req, res, next) => ProductFactory.getAllProducts(req, res, next));

module.exports = ProductRouter;