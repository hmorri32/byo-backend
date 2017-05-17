/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

const chai          = require('chai');
const should        = chai.should();
const chaiHttp      = require('chai-http');
const server        = require('../server');
const configuration = require('../knexfile')['test']
const database      = require('knex')(configuration)

chai.use(chaiHttp);

describe('server side testing', () => {
  it('shouldnt explode', () => {
    let coolGuy = 'radical';

    coolGuy.should.equal('radical');
  });
});