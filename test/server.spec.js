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

  before((done) => {
    database.migrate.latest()
    .then(() => database.seed.run())
    .then(() => done());
  });

  afterEach((done) => {
    database.seed.run()
    .then(() => done());
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

    it('shouldnt let me post a cool shark without JWT', (done) => {
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
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
        done();
      });
    });

    it('shouldnt allow me to post with whack data', (done) => {
      chai.request(server)
      .post('/api/v1/sharks')
      .set('Authorization', process.env.TOKEN)
      .send({
        whackdata: 3,
        fake: 12,
        sad: 'reggae shark',
        uncool: '2',
        burrito: 'tiger shark',
        suh: 'mayonnaise',
        dude: 'yung',
        fakez: 'chill',
        notcool: '420 lbs',
        include: 'a year ago',
        all: 'miami',
        fields: 'watch out for the evil jelly witch',
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Missing fields from request!');
        done();
      });
    });
  });

  describe('POST /api/v1/pings', () => {
    it('should allow me to post a cool ping', (done) => {
      chai.request(server)
      .post('/api/v1/pings')
      .set('Authorization', process.env.TOKEN)
      .send({
        id: 7,
        key: 7,
        shark_id: 12,
        ping_id: '2222',
        datetime: 'sometime',
        tz_datetime: 'anothertime',
        latitude: 'far north',
        longitude: 'far west'
      })
      .end((error, response) => {
        const thisPing = response.body[0];

        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        thisPing.should.have.property('key');
        thisPing.should.have.property('shark_id');
        thisPing.should.have.property('ping_id');
        thisPing.should.have.property('datetime');
        thisPing.should.have.property('tz_datetime');
        thisPing.should.have.property('latitude');
        thisPing.should.have.property('longitude');

        thisPing.key.should.equal(7);
        thisPing.shark_id.should.equal('12');
        thisPing.ping_id.should.equal('2222');
        thisPing.datetime.should.equal('sometime');
        thisPing.tz_datetime.should.equal('anothertime');
        thisPing.latitude.should.equal('far north');
        thisPing.longitude.should.equal('far west');
        done();
      });
    });

    it('shouldnt let me post ping without JWT', (done) => {
      chai.request(server)
      .post('/api/v1/pings')
      .set('Authorization', 'cool guy auth')
      .send({
        id: 7,
        key: 7,
        shark_id: 12,
        ping_id: '2222',
        datetime: 'sometime',
        tz_datetime: 'anothertime',
        latitude: 'far north',
        longitude: 'far west'
      })
      .end((error, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
        done();
      });
    });

    it('shouldnt let me post ping with baloney data', (done) => {
      chai.request(server)
      .post('/api/v1/pings')
      .set('Authorization', process.env.TOKEN)
      .send({
        cooldata: true,
        validData: false
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Missing fields from request!');
        done();
      });
    });
  });

  describe('PUT /api/v1/sharks:id', () => {
    it('should allow me to update an entire shark', (done) => {
      chai.request(server)
      .put('/api/v1/sharks/2')
      .set('Authorization', process.env.TOKEN)
      .send({
        shark_id: 6,
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
        const reggaeShark = response.body[0];

        response.should.have.status(200);
        response.should.be.a('object');
        response.body.length.should.equal(1);
        reggaeShark.should.have.property('shark_id');
        reggaeShark.should.have.property('name');
        reggaeShark.should.have.property('tagIdNumber');
        reggaeShark.should.have.property('species');
        reggaeShark.should.have.property('gender');
        reggaeShark.should.have.property('stageOfLife');
        reggaeShark.should.have.property('length');
        reggaeShark.should.have.property('weight');
        reggaeShark.should.have.property('tagDate');
        reggaeShark.should.have.property('tagLocation');
        reggaeShark.should.have.property('description');

        reggaeShark.shark_id.should.equal(6);
        reggaeShark.name.should.equal('reggae shark');
        reggaeShark.tagIdNumber.should.equal('2');
        reggaeShark.species.should.equal('tiger shark');
        reggaeShark.gender.should.equal('mayonnaise');
        reggaeShark.stageOfLife.should.equal('yung');
        reggaeShark.length.should.equal('chill');
        reggaeShark.weight.should.equal('420 lbs');
        done();
      });
    });

    it('should not allow me to PUT if im not authorized', (done) => {
      chai.request(server)
      .put('/api/v1/sharks/2')
      .set('Authorization', 'super hacker')
      .send({
        shark_id: 6,
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
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
        done();        
      });
    });

    it('should not allow me to update ID', (done) => {
      chai.request(server)
      .put('/api/v1/sharks/2')
      .set('Authorization', process.env.TOKEN)
      .send({
        id: 2,
        shark_id: 6,
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
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('you cannot update that yung ID!');
        done();        
      });
    });

    it('should not allow me to PUT bogus data', (done) => {
      chai.request(server)
      .put('/api/v1/sharks/2')
      .set('Authorization', process.env.TOKEN)
      .send({
        coolguy: 6,
        hotdata: 'reggae shark',
        bignumbers: '2',
        whatsup: 'tiger shark',
        burritos: 'mayonnaise',
        carne: 'yung',
        a: 'chill',
        suh: '420 lbs',
        dude: 'a year ago',
        radical: 'jamaica',
        tubular: 'watch out for the evil jelly witch',
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Missing fields from request!');
        done();        
      });
    });
  });
  
  describe('PUT /api/v1/pings/:id', () => {
    it('should allow me to update a ping', (done) => {
      chai.request(server)
      .put('/api/v1/pings/4')
      .set('Authorization', process.env.TOKEN)
      .send({
        key: 7,
        shark_id: 12,
        ping_id: '2222',
        datetime: 'sometime',
        tz_datetime: 'anothertime',
        latitude: 'far north',
        longitude: 'far west'
      })
      .end((error, response) => {
        const thisPing = response.body[0];

        response.should.have.status(200);
        response.should.be.a('object');
        response.body.length.should.equal(1);

        thisPing.should.have.property('key');
        thisPing.should.have.property('shark_id');
        thisPing.should.have.property('ping_id');
        thisPing.should.have.property('datetime');
        thisPing.should.have.property('tz_datetime');
        thisPing.should.have.property('latitude');
        thisPing.should.have.property('longitude');

        thisPing.key.should.equal(7);
        thisPing.shark_id.should.equal('12');
        thisPing.ping_id.should.equal('2222');
        thisPing.datetime.should.equal('sometime');
        thisPing.tz_datetime.should.equal('anothertime');
        thisPing.latitude.should.equal('far north');
        thisPing.longitude.should.equal('far west');

        done();
      });
    });

    it('should not allow me to PUT if unauthorized', (done) => {
      chai.request(server)
      .put('/api/v1/pings/4')
      .set('Authorization', 'haxx')
      .send({
        key: 7,
        shark_id: 12,
        ping_id: '2222',
        datetime: 'sometime',
        tz_datetime: 'anothertime',
        latitude: 'far north',
        longitude: 'far west'
      })
      .end((error, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
        done();   
      });
    });

    it('should not allow me to update ID', (done) => {
      chai.request(server)
      .put('/api/v1/pings/4')
      .set('Authorization', process.env.TOKEN)
      .send({
        id: 10,
        key: 7,
        shark_id: 12,
        ping_id: '2222',
        datetime: 'sometime',
        tz_datetime: 'anothertime',
        latitude: 'far north',
        longitude: 'far west'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('you cannot update that yung ID!');
        done();   
      });
    });

    it('should not allow me to PUT bogus data', (done) => {
      chai.request(server)
      .put('/api/v1/pings/4')
      .set('Authorization', process.env.TOKEN)
      .send({
        bogus: 7,
        data: 12,
        is: '2222',
        all: 'sometime',
        the: 'anothertime',
        rage: 'far north',
        man: 'far west'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Missing fields from request!');
        done();     
      });
    });
  });

  describe('PATCH /api/v1/sharks/:id', () => {
    it('should let me patch up a sharks name species and description', (done) => {
      chai.request(server)
      .patch('/api/v1/sharks/2')
      .set('Authorization', process.env.TOKEN)
      .send({
        name: 'cool guy mcgee',
        species: 'Octopus',
        description: 'Steve Zissou is now an octopus. dealwithit.'
      })
      .end((error, response) => {
        const newShark = response.body[0];

        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        newShark.should.have.property('shark_id');
        newShark.should.have.property('name');
        newShark.should.have.property('tagIdNumber');
        newShark.should.have.property('species');
        newShark.should.have.property('gender');
        newShark.should.have.property('stageOfLife');
        newShark.should.have.property('length');
        newShark.should.have.property('weight');
        newShark.should.have.property('tagDate');
        newShark.should.have.property('tagLocation');
        newShark.should.have.property('description');

        newShark.name.should.equal('cool guy mcgee');
        newShark.species.should.equal('Octopus');
        newShark.description.should.equal('Steve Zissou is now an octopus. dealwithit.');
        done();
      });
    });

    it('should not let me PATCH sharks ID', (done) => {
      chai.request(server)
      .patch('/api/v1/sharks/2')
      .set('Authorization', process.env.TOKEN)
      .send({
        id: 23, 
        name: 'cool guy mcgee',
        species: 'Octopus',
        description: 'Steve Zissou is now an octopus. dealwithit.'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.error.should.equal('you cannot update that yung ID!');
        done();
      });
    });

    it('should not let me PATCH if unauthorized', (done) => {
      chai.request(server)
      .patch('/api/v1/sharks/2')
      .set('Authorization', 'im super authorized')
      .send({
        name: 'cool guy mcgee',
        species: 'Octopus',
        description: 'Steve Zissou is now an octopus. dealwithit.'
      })
      .end((error, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
        done();   
      });
    });

    it('should not let me PATCH with bogus data', (done) => {
      chai.request(server)
      .patch('/api/v1/sharks/2')
      .set('Authorization', process.env.TOKEN)
      .send({
        ultra: 'cool guy mcgee',
        cool: 'Octopus',
        data: 'Steve Zissou is now an octopus. dealwithit.'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Missing fields from request!');
        done();  
      });
    });
  });

  describe('PATCH /api/v1/pings/:id', () => {
    it('should allow me to patch up a ping', (done) => {
      chai.request(server)
      .patch('/api/v1/pings/4')
      .set('Authorization', process.env.TOKEN)
      .send({
        datetime: 'today probably',
        latitude: 'flatitude',
        longitude: '..inal wave'
      })
      .end((error, response) => {
        const ping = response.body[0];

        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.equal(1);   

        ping.should.have.property('key');
        ping.should.have.property('shark_id');
        ping.should.have.property('ping_id');
        ping.should.have.property('datetime');
        ping.should.have.property('tz_datetime');
        ping.should.have.property('latitude');
        ping.should.have.property('longitude');

        ping.datetime.should.equal('today probably');
        ping.latitude.should.equal('flatitude');
        ping.longitude.should.equal('..inal wave');

        done();
      });
    });

    it('should not let me PATCH an ID', (done) => {
      chai.request(server)
      .patch('/api/v1/pings/4')
      .set('Authorization', process.env.TOKEN)
      .send({
        id: 2,
        datetime: 'today probably',
        latitude: 'flatitude',
        longitude: '..inal wave'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.error.should.equal('you cannot update that yung ID!');
        done();
      });
    });

    it('should not let me patch if unauthorized', (done) => {
      chai.request(server)
      .patch('/api/v1/pings/4')
      .set('Authorization', 'password')
      .send({
        datetime: 'today probably',
        latitude: 'flatitude',
        longitude: '..inal wave'
      })
      .end((error, response) => {
        response.should.have.status(403);
        response.body.should.be.a('object');
        response.body.success.should.equal(false);
        response.body.message.should.equal('Invalid authorization token.');
        done(); 
      });
    });

    it('should not let me PATCH bogus data', (done) => {
      chai.request(server)
      .patch('/api/v1/pings/4')
      .set('Authorization', process.env.TOKEN)
      .send({
        bogus: 'today probably',
        data: 'flatitude',
        notCool: '..inal wave'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');
        response.body.error.should.equal('Missing fields from request!');
        done();  
      });
    });
  });

  describe('DELETE /api/v1/sharks/:id', () => {
    it('should let me delete a shark', (done) => {
      chai.request(server)
      .delete('/api/v1/sharks/2')
      .end((eror, response) => {
        const shark = response.body[0];

        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        shark.should.have.property('shark_id');
        shark.should.have.property('name');
        shark.should.have.property('tagIdNumber');
        shark.should.have.property('species');
        shark.should.have.property('gender');
        shark.should.have.property('stageOfLife');
        shark.should.have.property('length');
        shark.should.have.property('weight');
        shark.should.have.property('tagDate');
        shark.should.have.property('tagLocation');
        shark.should.have.property('description');

        shark.name.should.equal('Alistair Hennessey');
        shark.species.should.equal('Jaguar shark');
        done();
      });
    });

    it('should not let me delete a bogus ID', () => {
      chai.request(server)
      .delete('/api/v1/sharks/2222')
      .end((error, response) => {
        console.log(response.body)
        response.should.have.status(200)
      })
    })
  });
});














