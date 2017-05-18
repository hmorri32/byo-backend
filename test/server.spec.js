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

          const firstShark  = response.body[0];
          const secondShark = response.body[1];

          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          
          firstShark.should.have.property('id');
          firstShark.should.have.property('shark_id');
          firstShark.should.have.property('name');
          firstShark.should.have.property('tagIdNumber');
          firstShark.should.have.property('species');
          firstShark.should.have.property('gender');
          firstShark.should.have.property('stageOfLife');
          firstShark.should.have.property('length');
          firstShark.should.have.property('weight');
          firstShark.should.have.property('tagDate');
          firstShark.should.have.property('tagLocation');
          firstShark.should.have.property('description');

          secondShark.should.have.property('id');
          secondShark.should.have.property('shark_id');
          secondShark.should.have.property('name');
          secondShark.should.have.property('tagIdNumber');
          secondShark.should.have.property('species');
          secondShark.should.have.property('gender');
          secondShark.should.have.property('stageOfLife');
          secondShark.should.have.property('length');
          secondShark.should.have.property('weight');
          secondShark.should.have.property('tagDate');
          secondShark.should.have.property('tagLocation');
          secondShark.should.have.property('description');

          firstShark.id.should.equal(1);
          secondShark.id.should.equal(2);
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

      it('should get sharks using that sweet sweeet query string', (done) => {
        chai.request(server)
        .get('/api/v1/sharks?species=Jaguar shark')
        .end((error, response) => {
          const yungJaguarShark = response.body[0];

          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);

          yungJaguarShark.should.have.property('id');
          yungJaguarShark.should.have.property('shark_id');
          yungJaguarShark.should.have.property('name');
          yungJaguarShark.should.have.property('tagIdNumber');
          yungJaguarShark.should.have.property('species');
          yungJaguarShark.should.have.property('gender');
          yungJaguarShark.should.have.property('stageOfLife');
          yungJaguarShark.should.have.property('length');
          yungJaguarShark.should.have.property('weight');
          yungJaguarShark.should.have.property('tagDate');
          yungJaguarShark.should.have.property('tagLocation');
          yungJaguarShark.should.have.property('description');

          yungJaguarShark.id.should.equal(1);
          yungJaguarShark.shark_id.should.equal(12);
          yungJaguarShark.name.should.equal('Alistair Hennessey');

          done();
        });
      });
    });
  });
});


