module.export = class ProductsController {
  constructor(service) {
    this.service = service;
  }

  async getAllProducts(_req, res, next) {
    try {
      const allProducts = await this.service.getAllProducts();
      return res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }
};