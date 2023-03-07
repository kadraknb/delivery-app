const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { getUserbyroleSeller } = require('./mocks');
const { User } = require('../../../database/models');
const TokenGenerator = require('../../../utils/auth/TokenGenerator');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint post /register', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Cria usario com sucesso', () => {
    it('cria usario uma Json com usario que são vendedores', async () => {
      const { status, body } = await chai.request(app).get('/seller');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getUserbyroleSeller);
    });
  });
});