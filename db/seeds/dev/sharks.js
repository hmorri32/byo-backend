// knex seed:run

const path     = require('path');
const seedFile = require('knex-seed-file');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([knex('sharks').del()])
  .then(() => seedFile(knex, path.resolve('sharks.csv'), 'sharks', [
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

// exports.seed = function(knex, Promise) {
//   return Promise.all([knex('pings').del()])
//   .then(() => seedFile(knex, path.resolve('pings.csv'), 'pings', [
//     "active",
//     "shark_id",
//     "id",
//     "datetime",
//     "tz_datetime",
//     "latitude",
//     "longitude"
//   ], {
//     columnSeparator: ',',
//     ignoreFirstLine: true
//   }))
// }







// exports.seed = function(knex, Promise) {
//   return knex('sharks').del()
//   .then(() => seedFile(knex, path.resolve('./sharks.csv'), 'sharks', [
//     'sharks_id',
//     'name',
//     'tagIdNumber',
//     'species',
//     'gender',
//     'stageOfLife',
//     'length',
//     'weight',
//     'tagDate',
//     'tagLocation',
//     'description'
//     ], {
//       columnSeparator: ';',
//       ignoreFirstLine: true
//     }));
// };

