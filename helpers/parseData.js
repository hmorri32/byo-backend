const json2csv  = require('json2csv');
const fs        = require('fs');
const sharkData = require('../data/sharkData.js');
const pingData  = require('../data/pingData.js');
const sharks    = json2csv({ data: sharkData });
const pings     = json2csv({ data: pingData });
 
fs.writeFile('../data/sharks.csv', sharks, function(err) {
  if (err) throw err;
});

fs.writeFile('../data/pings.csv', pings, function(err) {
  if(err) throw err;
});