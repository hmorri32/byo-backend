// knex migrate:latest
// knex migrate:rollback

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sharks', function(table) {
      table.increments('id').primary();
      table.integer('sharks_id');
      table.string('name');
      table.string('tagIdNumber');
      table.string('species');
      table.string('gender');
      table.string('stageOfLife');
      table.string('length');
      table.string('weight');
      table.string('tagDate');
      table.string('tagLocation');
      table.string('description');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('pings', function(table) {
      table.increments('id').primary();
      table.string('active');
      table.string('shark_id');
      table.string('ping_id');
      table.string('datetime');
      table.string('tz_datetime');
      table.string('latitude');
      table.string('longitude');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pings'),
    knex.schema.dropTable('sharks')
  ]);
};


