const json2csv  = require('json2csv');
const fs        = require('fs');
const sharkData = require('./sharkData.js');
const pingData  = require('./pingData.js');
const sharks    = json2csv({ data: sharkData });
const pings     = json2csv({ data: pingData });
 
fs.writeFile('sharks.csv', sharks, function(err) {
  if (err) throw err;
});

fs.writeFile('pings.csv', pings, function(err) {
  if(err) throw err;
});