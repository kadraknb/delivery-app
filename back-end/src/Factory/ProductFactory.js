const { Products } = require('../database/models');
const ProductsService = require('../Services/ProductsService');
const ProductsController = require('../Controllers/ProductsController');

const service = new ProductsService(Products);
const controller = new ProductsController(service);

module.exports = controller;