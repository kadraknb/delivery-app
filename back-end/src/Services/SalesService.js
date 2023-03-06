module.exports = class SalesService {
  constructor(model, modelSaleProduct) {
    this.model = model;
    this.modelSaleProduct = modelSaleProduct;
  }

  async createSales(values) {
    const { products: _, ...sale } = values;

    const saleDate = new Date();
    const newSale = await this.model.create({ ...sale, saleDate, status: 'Pendente' });

    await Promise.all(values.products
      .map(async ({ id, quantity }) => this.modelSaleProduct.create(
          { saleId: newSale.id, productId: id, quantity },
      )));

    return newSale;
  }
};