module.exports = class SalesController {
  constructor(service) {
    this.service = service;
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