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

describe('our yung server', function () {
  it('should exist', function () {
    expect(server).to.exist;
  });
});

describe('server side testing', () => {
  // before((done) => {
  //   database.migrate.latest()
  //   .then(() => {
  //     database.seed.run();
  //   })
  //   .then(() => {
  //     done();
  //   });
  // });

  // afterEach((done) => {
  //   database.seed.run()
  //   .then(() => {
  //     done();
  //   });
  // });

  // beforeEach((done) => {
  //   database.migrate.rollback()
  //   .then(() => {
  //   database.migrate.latest()
  //   .then(() => {
  //     database.seed.run()
  //     .then(() => {
  //       done()
  //       })
  //     })
  //   })
  // });


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
    describe('GET /api/v1/sharks', (request, response) => {
      const suh = 'radical';
      suh.should.equal('radical')
    });
  });
});








