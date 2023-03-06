const { Sales } = require('../database/models');
const SalesService = require('../Services/SalesService');
const SalesController = require('../Controllers/SalesController');

const service = new SalesService(Sales);
const controller = new SalesController(service);

module.exports = controller;