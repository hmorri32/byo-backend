// knex seed:run

const path     = require('path');
const seedFile = require('knex-seed-file');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([knex('pings').del(), knex('sharks').del()])
  .then(() => seedFile(knex, path.resolve('result.csv'), 'sharks', [
    'sharks_id',
    'name',
    'tagIdNumber',
    'species',
    'gender',
    'stageOfLife',
    'length',
    'weight',
    'tagDate',
    'tagLocation',
    'description'
  ], {
    columnSeparator: ',',
    ignoreFirstLine: true
  }));
};