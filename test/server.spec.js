/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';
const chai           = require('chai');
const should         = chai.should();
const expect         = chai.expect;
const assert         = chai.assert;
const chaiHttp       = require('chai-http');
const server         = require('../server.js');
const configuration  = require('../knexfile.js')['test'];
const database       = require('knex')(configuration);

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
        assert.deepEqual(response.res.text, '{"name":"hugh","cool":true}');
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

      it('should chuck an error if passed bogus query param data', (done) => {
        chai.request(server)
        .get('/api/v1/sharks?species=ultra cool shark')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.html;
          response.res.text.should.include('Your query param is ultra invalid!');
          done();
        });
      });
    });
  });

  describe('GET /api/v1/sharks/:id', () => {
    it('should return a single shark by ID', (done) => {
      chai.request(server)
      .get('/api/v1/sharks/1')
      .end((error, response) => {
        const thisShark = response.body[0];

        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        thisShark.should.have.property('id');
        thisShark.should.have.property('shark_id');
        thisShark.should.have.property('name');
        thisShark.should.have.property('tagIdNumber');
        thisShark.should.have.property('species');
        thisShark.should.have.property('gender');
        thisShark.should.have.property('stageOfLife');
        thisShark.should.have.property('length');
        thisShark.should.have.property('weight');
        thisShark.should.have.property('tagDate');
        thisShark.should.have.property('tagLocation');
        thisShark.should.have.property('description');

        thisShark.id.should.equal(1);
        done();
      });
    });

    it('should return a a second shark by ID', (done) => {
      chai.request(server)
      .get('/api/v1/sharks/2')
      .end((error, response) => {
        const anotherShark = response.body[0];

        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        anotherShark.should.have.property('id');
        anotherShark.should.have.property('shark_id');
        anotherShark.should.have.property('name');
        anotherShark.should.have.property('tagIdNumber');
        anotherShark.should.have.property('species');
        anotherShark.should.have.property('gender');
        anotherShark.should.have.property('stageOfLife');
        anotherShark.should.have.property('length');
        anotherShark.should.have.property('weight');
        anotherShark.should.have.property('tagDate');
        anotherShark.should.have.property('tagLocation');
        anotherShark.should.have.property('description');

        anotherShark.id.should.equal(2);
        done();
      });
    });

    it('should chuck a bloody error if ID not found', (done) => {
      chai.request(server)
      .get('/api/v1/sharks/23232')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.html;
        response.res.text.should.include('ID not found!');
        done();
      });
    });
  });

  describe('GET /api/v1/sharks/:id/pings', () => {
    it('should return all pings pertaining to a certain shark', (done) => {
      chai.request(server)
      .get('/api/v1/sharks/1/pings')
      .end((error, response) => {

        const pingOne   = response.body[0];
        const pingTwo   = response.body[1];
        const pingThree = response.body[2];

        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);

        pingOne.should.have.property('id');
        pingTwo.should.have.property('id');
        pingThree.should.have.property('id');

        pingOne.id.should.equal(1);
        pingTwo.id.should.equal(2);
        pingThree.id.should.equal(3);

        done();
      });
    });

    it('should return error if passed bogus shark ID', (done) => {
      chai.request(server)
      .get('/api/v1/sharks/343/pings')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.html;
        response.res.text.should.include('ID not found!');
        done();
      });
    });
  });

  describe('POST /api/v1/sharks', () => {
    it('should allow me to post a new chic shark', (done) => {
      chai.request(server)
      .post('/api/v1/sharks')
      .set('Authorization', process.env.TOKEN)
      .send({
        id: 3,
        shark_id: 23222223,
        name: 'cool guy shark',
        tagIdNumber: 'coolnumber',
        species: 'bull shark',
        gender: 'toxic masculinity',
        stageOfLife: 'old as',
        length: 'ultra long',
        weight: 'at least 100',
        tagDate: 'a year ago',
        tagLocation: 'bahamas',
        description: 'watch out for cool guy shark',
      })
      .end((error, response) => {
        const coolGuyShark = response.body[0];

        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        coolGuyShark.should.have.property('shark_id');
        coolGuyShark.should.have.property('name');
        coolGuyShark.should.have.property('tagIdNumber');
        coolGuyShark.should.have.property('species');
        coolGuyShark.should.have.property('gender');
        coolGuyShark.should.have.property('stageOfLife');
        coolGuyShark.should.have.property('length');
        coolGuyShark.should.have.property('weight');
        coolGuyShark.should.have.property('tagDate');
        coolGuyShark.should.have.property('tagLocation');
        coolGuyShark.should.have.property('description');

        coolGuyShark.shark_id.should.equal(23222223);
        coolGuyShark.name.should.equal('cool guy shark');
        coolGuyShark.tagIdNumber.should.equal('coolnumber');
        coolGuyShark.species.should.equal('bull shark');
        coolGuyShark.gender.should.equal('toxic masculinity');
        coolGuyShark.stageOfLife.should.equal('old as');
        coolGuyShark.weight.should.equal('at least 100');
        coolGuyShark.tagDate.should.equal('a year ago');
        coolGuyShark.tagLocation.should.equal('bahamas');
        coolGuyShark.description.should.equal('watch out for cool guy shark');
        done();
      });
    });

    it('shouldnt let me post a cool shark without JWT', () => {
      chai.request(server)
      .post('/api/v1/sharks')
      .set('Authorization', 'cool guy token')
      .send({
        id: 4,
        shark_id: 12,
        name: 'reggae shark',
        tagIdNumber: '2',
        species: 'tiger shark',
        gender: 'mayonnaise',
        stageOfLife: 'yung',
        length: 'chill',
        weight: '420 lbs',
        tagDate: 'a year ago',
        tagLocation: 'jamaica',
        description: 'watch out for the evil jelly witch',
      })
      .end((error, response) => {
        response.should.have.status(403)
        response.body.should.be.a('object')
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
      });
    });
  });
});








