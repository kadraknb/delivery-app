const { Router } = require('express');
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const SalesRouter = require('./SalesRouter');

const router = Router();

router.use(UserRouter);
router.use(ProductRouter);
router.use(SaleRouter);

module.exports = router;