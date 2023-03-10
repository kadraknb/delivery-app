const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { salesWithProducts } = require('./mocks');
const { Sales, Products } = require('../../../database/models');
// const TokenGenerator = require('../../../utils/auth/TokenGenerator');
const app = require('../../../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint get /sales/products/:id', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Busca todas vendas com produtos pelo id, com sucesso', () => {
    it('Retorna uma Json com vendas', async () => {
      const { status, body } = await chai.request(app).get('/sales/products/1');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(salesWithProducts);
    });
  });
  describe('Busca todas vendas com produtos pelo id com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(Sales, 'findAll').resolves(salesWithProducts);
      const { status, body } = await chai.request(app).get('/sales/products/1');

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": "undefined is not a function"});
    });
  });
});