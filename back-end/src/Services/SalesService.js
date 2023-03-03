module.exports = class SalesService {
  constructor(model) {
    this.model = model;
  }

  async getAllSales() {
    const allSales = await this.model.findAll();
    return allSales;
  }
};