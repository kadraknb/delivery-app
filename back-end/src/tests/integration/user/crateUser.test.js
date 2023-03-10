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

  describe('Cria usario com Erro', () => {
    const errorMin = '"name" length must be at least 12 characters long'
    it('Retorna uma menssgem "name is required"', async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "",
        "email": "grupo23@tb.com",
        "password": "$#grupo23#$"
      })
      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: '"name" is required' });
    });
    it(`Retorna uma menssgem ${errorMin}`, async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "Grupo23",
        "email": "grupo23@tb.com",
        "password": "$#grupo23#$"
      })
      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: errorMin });
    });
    it('Retorna uma menssgem "email is required"', async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "Grupo 23 Tribo B",
        "email": "",
        "password": "$#grupo23#$"
      })

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: '"email" is required' });
    });
    it('Retorna uma menssgem "email incorrect"', async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "Grupo 23 Tribo B",
        "email": "grupo23tb.com",
        "password": "$#grupo23#$"
      })

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: 'email incorrect' });
    });
    it('Retorna uma menssgem "password is required"', async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "Grupo 23 Tribo B",
        "email": "grupo23@tb.com",
        "password": ""
      })

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: '"password" is required' });
    });
    it('Retorna uma menssgem "password length..."', async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "Grupo 23 Tribo B",
        "email": "grupo23@tb.com",
        "password": "$#gru"
      })

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: '"password" length must be at least 6 characters long' });
    });
    it('Retorna uma menssgem "user exist"', async () => {
      const { status, body } = await chai.request(app).post('/register').send({
        "name": "ze birita grupo23",
        "email": "zebirita@email.com",
        "password": "$#grupo23b#$"
      })

      expect(status).to.be.equal(409);
      expect(body).to.be.deep.equal({ message: 'user exist' });
    });
  });
});