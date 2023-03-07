const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { tokenMock, createUserMock, createUserInBdMock } = require('./mocks');
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
      sinon.stub(User, 'create').resolves(createUserInBdMock);
      sinon.stub(TokenGenerator, 'generateToken').resolves(tokenMock);
      const { status, body } = await chai.request(app).post('/register').send(
        {
          "name": "Grupo 23 Tribo B",
          "email": "grupo23@tb.com",
          "password": "$#grupo23#$"
        });

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(createUserMock);
    });
  });
});