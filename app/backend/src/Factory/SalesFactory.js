const { Sales, SalesProducts, Products } = require('../database/models');
const SalesService = require('../Services/SalesService');
const SalesController = require('../Controllers/SalesController');

const service = new SalesService(Sales, SalesProducts, Products);
const controller = new SalesController(service);

module.exports = controller;