// knex migrate:latest
// knex migrate:rollback

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sharks', function(table) {
      table.increments('id').primary();
      table.string('sharks_id');
      table.string('name');
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
      table.string('pings_active');
      table.string('pings_id');
      table.string('pings_datetime');
      table.string('pings_tz_datetime');
      table.string('pings_latitude');
      table.string('pings_longitude');
      table.integer('shark_id').unsigned();
      table.foreign('shark_id')
        .references('sharks.id');

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

