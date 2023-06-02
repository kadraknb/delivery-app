const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../../database/models');
const { userMock, tokenMock } = require('./mocks');
// const TokenGenerator = require('../../../utils/auth/TokenGenerator');
const jwt = require('jsonwebtoken');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint delete /admin/manage/:id', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Apaga usuarios pelo id com sucesso', () => {
    it('Retorna uma mensagem "User deleted"', async () => {
      sinon.stub(User, 'destroy').resolves(userMock);
      sinon.stub(jwt, 'verify').resolves();

      const { status, body } = await chai.request(app).delete('/admin/manage/3')
        .set("Authorization", tokenMock);;

      expect(status).to.be.equal(204);
      expect(body).to.be.deep.equal({});
    });
  });
  describe('Apaga usuarios pelo id com ERRO', () => {
    it('Retorna uma mensagem de erro', async () => {
      sinon.stub(jwt, 'verify').resolves();

      const { status, body } = await chai.request(app).delete('/admin/manage/@')
        .set("Authorization", tokenMock);;

      expect(status).to.be.equal(500);
      expect(body).to.be.deep.equal({"message": "Truncated incorrect DOUBLE value: '@'"});
    });
  });
});