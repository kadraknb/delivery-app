const { Router } = require("express");
// const SalesController = require('../Controllers/SalesController');
const SalesFactory = require("../Factory/SalesFactory");
// const validateToken = require('../middlewares/validateToken');
const TokenGenerator = require("../utils/auth/TokenGenerator");
const SalesRouter = Router();

SalesRouter.get("/customer/orders", (req, res, next) =>
  SalesFactory.getAllSales(req, res, next)
);

// SalesRouter.use(TokenGenerator.validateToken)

SalesRouter.post("/sales", (req, res, next) =>
  SalesFactory.createSales(req, res, next)
);

SalesRouter.get("/sales/detail", (req, res, next) =>
  SalesFactory.getOrderWithAssociation(req, res, next)
);
SalesRouter.put("/sales/detail/:id", (req, res, next) =>
  SalesFactory.changeStateOfSaleById(req, res, next)
);

module.exports = SalesRouter;
