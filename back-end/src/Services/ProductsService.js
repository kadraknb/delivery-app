module.exports = class ProductsService {
  constructor(model) {
    this.model = model;
  }

  async getAllProducts() {
    const allProducts = await this.model.findAll();
    return allProducts;
  }
};