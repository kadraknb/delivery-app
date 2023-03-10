const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { User } = require('../../../database/models');
const { getAllUsers } = require('./mocks');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint get /admin/manage', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Busca todos usuarios pelo role "customer", "seller" com sucesso', () => {
    it('Retorna uma Json com usarios que são vendedores e clientes', async () => {
      sinon.stub(User, 'findAll').resolves(getAllUsers);

      const { status, body } = await chai.request(app).get('/admin/manage');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getAllUsers);
    });
  });
});