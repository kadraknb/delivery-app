module.exports = class SalesProductsService {
  constructor(model, modelProduct) {
    this.model = model;
    this.modelProduct = modelProduct;
  }

  async getAllProductsWithSalesById(id) {
    const [allProducts] = await this.model.findAll({ where: { id },
      include: [{ model: this.modelProduct,
      as: 'products',
    }],
    });
    return allProducts;
  }
};