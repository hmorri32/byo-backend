// knex seed:run

const path = require("path");
const seedFile = require("knex-seed-file");

exports.seed = function(knex, Promise) {
  return Promise.all([knex("pings").del(), knex("sharks").del()])
    .then(() =>
      seedFile(
        knex,
        path.resolve("data/sharks.csv"),
        "sharks",
        [
          "shark_id",
          "name",
          "tagIdNumber",
          "species",
          "gender",
          "stageOfLife",
          "length",
          "weight",
          "tagDate",
          "tagLocation",
          "description"
        ],
        {
          columnSeparator: ",",
          ignoreFirstLine: true
        }
      )
    )
    .then(() =>
      seedFile(
        knex,
        path.resolve("data/pings.csv"),
        "pings",
        [
          "key",
          "shark_id",
          "ping_id",
          "datetime",
          "tz_datetime",
          "latitude",
          "longitude"
        ],
        {
          columnSeparator: ",",
          ignoreFirstLine: true
        }
      )
    );
};
