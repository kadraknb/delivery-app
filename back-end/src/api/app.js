const express = require('express');
const cors = require('cors');
const erro = require('../middlewares/error');
const router = require('../Routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(router);
app.use(erro);

module.exports = app;
