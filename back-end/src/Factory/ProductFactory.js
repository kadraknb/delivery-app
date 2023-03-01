const { Product } = require('../database/models');
const ProductService = require('../Services/ProductsService');
const ProductController = require('../Controllers/ProductsController');

const service = new ProductService(Product);
const controller = new ProductController(service);

module.exports = controller;