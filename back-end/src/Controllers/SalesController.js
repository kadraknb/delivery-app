module.exports = class SalesController {
  constructor(service) {
    this.service = service;
  }

  async createSales(req, res, next) {
    try {
      const newSale = await this.service.createSales(req.body);
      return res.status(201).json(newSale);
      } catch (error) {
      next(error);
    }
  }
  
  async getAllSales(_req, res, next) {
    try {
      const allSales = await this.service.getAllSales();
      return res.status(200).json(allSales);
    } catch (error) {
      next(error);
    }
  }
};