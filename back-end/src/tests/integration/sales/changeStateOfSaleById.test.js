const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { saleMock, SalesProductsMock } = require('./mocks');
const { Sales, SalesProducts, Products } = require('../../../database/models');
// const TokenGenerator = require('../../../utils/auth/TokenGenerator');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint patch /sales/detail/:id', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Atualiza status de uma venda pelo id com sucesso', () => {
    it('Atualiza status de uma venda Sucesso', async () => {
      sinon.stub(Sales, 'update').resolves({"status": "Entregue"});
      const { status, body } = await chai.request(app).patch('/sales/detail/1').send(
        {
          "status": "Entregue"
        });

      expect(status).to.be.equal(204);
      expect(body).to.be.deep.equal({});
    });
  });
  describe('Atualiza status de uma venda pelo id com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(Sales, 'update').throws(new Error());;
      const { status, body } = await chai.request(app).patch('/sales/detail/1').send(
        {
          "status": "Entregue"
        });

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": ""});
    });
  });
});