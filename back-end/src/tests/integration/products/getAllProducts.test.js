const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Products } = require('../../../database/models');
const { prouctsMock } = require('./mocks');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint get /customer/products', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Busca todos produtos com sucesso', () => {
    it('Retorna uma Json com produtos', async () => {
      sinon.stub(Products, 'findAll').resolves(prouctsMock);

      const { status, body } = await chai.request(app).get('/customer/products');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(prouctsMock);
    });
  });
  describe('Busca todos usuarios pelo role "customer", "seller" com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(Products, 'findAll').throws(new Error());
      const { status, body } = await chai.request(app).get('/customer/products');

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": ""});
    });
  });
});