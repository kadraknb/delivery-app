module.exports = class SalesService {
  constructor(sales, saleProduct, product, user) {
    this.model = sales;
    this.modelSaleProduct = saleProduct;
    this.modelProduct = product;
    this.modelUser = user;
  }

  async createSales(values) {
    const { products: _, ...sale } = values;
    const saleDate = new Date();
    const newSale = await this.model.create({
      ...sale,
      saleDate,
      status: 'Pending',
    });

    await Promise.all(
      values.products.map(async ({ id, quantity }) =>
        this.modelSaleProduct.create({
          saleId: newSale.id,
          productId: id,
          quantity,
        })),
    );

    return newSale;
  }
  
  async getAllSalesbyUserId(id) {
    const allSales = await this.model.findAll({ where: { userId: id } });
    return allSales;
  }

  async getAllSalesbySellerId(id) {
    const allSales = await this.model.findAll({ where: { sellerId: id } });
    return allSales;
  }

  async changeStateOfSaleById(id, status) {
    const sales = await this.model.update({ status }, { where: { id } });

    return sales;
  }
};
