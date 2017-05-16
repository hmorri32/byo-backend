const json2csv = require('json2csv');
const fs       = require('fs');
const data     = require('./sharkData.js');
const csv      = json2csv({ data: data });
 
fs.writeFile('result.csv', csv, function(err) {
  if (err) throw err;
});