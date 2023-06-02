const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { salesMock } = require('./mocks');
const { Sales, SalesProducts, Products } = require('../../../database/models');
// const TokenGenerator = require('../../../utils/auth/TokenGenerator');
const app = require('../../../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint get /customer/orders/:id', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Busca todas vendas pelo usuario "salles" pelo id, com sucesso', () => {
    it('Retorna uma Json com vendas', async () => {
      sinon.stub(Sales, 'findAll').resolves(salesMock);

      const { status, body } = await chai.request(app).get('/seller/orders/2');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(salesMock);
    });
  });
  describe('Busca todas vendas pelo usuario "salles" pelo id com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(Sales, 'findAll').throws(new Error());;
      const { status, body } = await chai.request(app).get('/seller/orders/2');

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": ""});
    });
  });
});