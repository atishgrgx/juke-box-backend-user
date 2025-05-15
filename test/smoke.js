const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
chai.use(chaiHttp); 

const expect = chai.expect;

describe('Smoke Tests', () => {
  
  it('should return 404 on unknown route', done => {
    chai.request(app)
      .get('/api/does-not-exist')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should allow registration', done => {
    chai.request(app)
      .post('/api/auth/register')
      .send({
        username: 'smoketestuser',
        email: 'smoke@example.com',
        password: 'test123'
      })
      .end((err, res) => {
        expect([201, 400]).to.include(res.status); // 400 if already registered
        done();
      });
  });

  it('should allow login with valid credentials', done => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'smoke@example.com',
        password: 'test123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should block protected route without token', done => {
    chai.request(app)
      .get('/api/auth/getUserProfile')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

});
