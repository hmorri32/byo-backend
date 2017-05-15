/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

const chai     = require('chai');
const should   = chai.should();
const chaiHttp = require('chai-http');
// const server   = require('../server');

chai.use(chaiHttp);

describe('testing stuff', () => {
  it('shouldnt explode', () => {
    let coolGuy = 'radical';

    coolGuy.should.equal('radical');
  });
});