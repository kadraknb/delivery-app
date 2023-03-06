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
};