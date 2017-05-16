var json2csv = require('json2csv');
var fs = require('fs');

var data = require('./sharkData.js');


var csv = json2csv({ data: data });
 
fs.writeFile('result.csv', csv, function(err) {
  if (err) throw err;
  console.log('file saved');
});