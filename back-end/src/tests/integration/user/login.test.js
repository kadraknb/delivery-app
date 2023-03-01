const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { userMock } = require('./mocks');
const { User } = require('../../../database/models');
const app = require('../../../api/app');


chai.use(chaiHttp);
const { expect } = chai;

describe('Teste endPoint /login', () => {
  afterEach(() => {
    (sinon).restore();
  });

  describe('Login com sucesso', () => {
    it('Retorna uma menssgem "login successful"', async () => {
      sinon.stub(User, 'findOne').resolves(userMock);
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "zebirita@email.com",
        "password": "$#zebirita#$"
      })

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal('login successful');
    });
  });

  describe('Login com Erro', () => {
    it('Retorna uma menssgem "email is required"', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "",
        "password": "$#zebirita#$"
      })

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: '"email" is required' });
    });
    it('Retorna uma menssgem "password is required"', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "zebirita@email.com",
        "password": ""
      })

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: '"password" is required' });
    });
    it('Retorna uma menssgem "email incorrect"', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "zebiritaemail.com",
        "password": "$#zebirita#$"
      })

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'email incorrect' });
    });
    it('Retorna uma menssgem "password length..."', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "zebirita@email.com",
        "password": "G-b23"
      })

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'password length must be at least 6 characters long' });
    });
    it('Retorna uma menssgem "user not exist"', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "grupo23b@email.com",
        "password": "$#zebirita#$"
      })

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'user not exist' });
    });
    it('Retorna uma menssgem "incorrect password"', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        "email": "zebirita@email.com",
        "password": "$#grupo23b#$"
      })

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: 'incorrect password' });
    });
  });
});