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

  async getAllSalesbyUserId(req, res, next) {
    try {
      const allSales = await this.service.getAllSalesbyUserId(req.params.id);
      return res.status(200).json(allSales);
    } catch (error) {
      next(error);
    }
  }

  async changeStateOfSaleById(req, res, next) {
    try {
      const { id } = req.params;
      const { newStatus } = req.body;

      await this.service.changeStateOfSaleById(id, newStatus);

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};
