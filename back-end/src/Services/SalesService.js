module.exports = class SalesService {
  constructor(model, modelSaleProduct, Product) {
    this.model = model;
    this.modelSaleProduct = modelSaleProduct;
    this.modelProduct = Product;
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

  async getAllSales() {
    const allSales = await this.model.findAll();
    return allSales;
  }

  async getOrderById(id) {
    const data = this.model.findOne({ where: { id } })
    return data;
  }

  async getOrderByIdWithAssociation(id) {
    const sales = await this.model.findOne({
      where: { id },
      include: [
        {
          model: this.modelSaleProduct,
          as: 'sale',
          attributes: { exclude: ['sale_id', 'product_id'] },
          include: {
            model: this.modelProduct,
            as: 'product',
            attributes: { exclude: 'id' },
          },
        },
      ],
    });
    return sales;
  }

  async changeStateOfSaleById(id, status) {
    const idIsValid = await this.getOrderById(id);
  
    if (!idIsValid) {
      const error = new Error('Error fetch order')
      error.statusCode = 404
      throw error
    }
    
    const sales = await this.model.update({ status }, { where: { id } });
  
    return sales;
  }
};