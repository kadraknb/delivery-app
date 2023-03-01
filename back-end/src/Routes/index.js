const { Router } = require('express');
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');

const router = Router();

router.use(UserRouter);
router.use(ProductRouter);

module.exports = router;