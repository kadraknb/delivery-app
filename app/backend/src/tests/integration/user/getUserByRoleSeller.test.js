const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { getUserbyroleSeller } = require('./mocks');
const { User } = require('../../../database/models');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint get /seller', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Busca usuario pelo role com sucesso', () => {
    it('Retorna uma Json com usario que são vendedores', async () => {
      const { status, body } = await chai.request(app).get('/seller');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getUserbyroleSeller);
    });
  });
  describe('Busca usuario pelo role com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(User, 'findAll').throws(new Error());;
      const { status, body } = await chai.request(app).get('/seller');

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": ""});
    });
  });
});