const { Sales, Products } = require('../database/models');
const SalesProductsService = require('../Services/SalesProductsService');
const SalesProductsController = require('../Controllers/SalesProductsController');

const service = new SalesProductsService(Sales, Products);
const controller = new SalesProductsController(service);

module.exports = controller;