const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { getUserbyroleSeller } = require('./mocks');
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
});