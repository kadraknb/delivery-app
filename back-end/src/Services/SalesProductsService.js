module.exports = class SalesProductsService {
  constructor(model, modelProduct) {
    this.model = model;
    this.modelProduct = modelProduct;
  }

  async getAllProductsWithSalesByUserId(id) {
    const allProducts = await this.model.findAll({ where: { userId: id },
      include: [{ model: this.modelProduct, as: 'products' }],
    });
    return allProducts;
  }
};