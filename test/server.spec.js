/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

const chai          = require('chai');
const should        = chai.should();
const expect        = chai.expect;
const assert        = chai.assert;
const chaiHttp      = require('chai-http');
const server        = require('../server.js');
const configuration = require('../knexfile.js')['test'];
const database      = require('knex')(configuration);

chai.use(chaiHttp);

describe('our yung application', function () {
  it('should exist', function () {
    expect(server).to.exist;
  });
});

describe('server side testing', () => {

  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        database.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done();
    });
  });


  describe('Client routes', () => {
    it('should return jason', (done) => {
      chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        assert.deepEqual(response.res.text, '{"user":"hugh","cool":true}');
        done();
      });
    });

    it('should return 404 for non existent route and render HTML error', (done) => {
      chai.request(server)
      .get('/cool/end/point')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.html;
        response.res.text.should.include('Route Not Found!');
        done();
      });
    });
  });

  describe('API routes', () => {
    describe('GET /api/v1/sharks', () => {
      it('should return all sharks', (done) => {
        chai.request(server)
        .get('/api/v1/sharks')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('shark_id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('tagIdNumber');
          response.body[0].should.have.property('species');
          response.body[0].should.have.property('gender');
          response.body[0].should.have.property('stageOfLife');
          response.body[0].should.have.property('length');
          response.body[0].should.have.property('weight');
          response.body[0].should.have.property('tagDate');
          response.body[0].should.have.property('tagLocation');
          response.body[0].should.have.property('description');
          response.body[1].should.have.property('id');
          response.body[1].should.have.property('shark_id');
          response.body[1].should.have.property('name');
          response.body[1].should.have.property('tagIdNumber');
          response.body[1].should.have.property('species');
          response.body[1].should.have.property('gender');
          response.body[1].should.have.property('stageOfLife');
          response.body[1].should.have.property('length');
          response.body[1].should.have.property('weight');
          response.body[1].should.have.property('tagDate');
          response.body[1].should.have.property('tagLocation');
          response.body[1].should.have.property('description');

          response.body[0].id.should.equal(1);
          response.body[1].id.should.equal(2);
          done();
        });
      });
      
      it('should return 404 for non existent route and render HTML error', (done) => {
        chai.request(server)
        .get('/api/v1/sharkzzzz')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.html;
          response.res.text.should.include('Route Not Found!');
          done();
        });
      });
    });
  });
});


