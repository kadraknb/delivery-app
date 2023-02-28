const { Router } = require('express');
const UserRouter = require('./UserRouter');

const router = Router();

router.use(UserRouter);

module.exports = router;