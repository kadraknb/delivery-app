const { Router } = require('express');
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const SalesRouter = require('./SalesRouter');
const AdminRouter = require('./AdminRouter');
const SalesProductRouter = require('./SalesProductRouter');

const router = Router();

router.use(UserRouter);
router.use(ProductRouter);
router.use(SalesRouter);
router.use(AdminRouter);
router.use(SalesProductRouter);

module.exports = router;