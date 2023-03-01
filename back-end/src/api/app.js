const express = require('express');
const erro = require('../middlewares/error');
const router = require('../Routes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(router);
app.use(erro);

module.exports = app;
