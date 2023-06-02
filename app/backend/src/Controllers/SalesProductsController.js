module.exports = class SalesProductsController {
  constructor(service) {
    this.service = service;
  }

  async getAllProductsWithSalesByUserId(req, res, next) {
    try {
      const allSalesWithCutomer = await this.service.getAllProductsWithSalesById(req.params.id);
      return res.status(200).json(allSalesWithCutomer);
    } catch (error) {
      next(error);
    }
  }
};