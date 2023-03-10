const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { saleMock, SalesProductsMock } = require('./mocks');
const { Sales, SalesProducts, Products } = require('../../../database/models');
// const TokenGenerator = require('../../../utils/auth/TokenGenerator');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint post /sales', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Cria uma venda com sucesso', () => {
    it('cria venda com Sucesso', async () => {
      sinon.stub(Sales, 'create').resolves(saleMock);
      sinon.stub(SalesProducts, 'create').resolves(SalesProductsMock);
      const { status, body } = await chai.request(app).post('/sales').send(
        {
          "userId": 4,
          "sellerId": 2,
          "totalPrice": 1200.00,
          "deliveryAddress": "Rua. Dom Pedre",
          "deliveryNumber": "16",
          "products": [{"id": 1, "quantity": 10}, {"id": 3, "quantity": 2}]
        });

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(saleMock);
    });
  });
  describe('Cria uma venda com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(Sales, 'create').throws(new Error());;
      const { status, body } = await chai.request(app).post('/sales').send(
        {
          "userId": 4,
          "sellerId": 2,
          "totalPrice": 1200.00,
          "deliveryAddress": "Rua. Dom Pedre",
          "deliveryNumber": "16",
          "products": [{"id": 1, "quantity": 10}, {"id": 3, "quantity": 2}]
        });

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": ""});
    });
  });
});