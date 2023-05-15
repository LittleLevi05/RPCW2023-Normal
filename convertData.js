const moment = require('moment');
const fs = require('fs');

const jsonData = fs.readFileSync('empregoCientifico.json', 'utf8');
const data = JSON.parse(jsonData);

function convertDateStringsToDates(input) {
  for (const key in input) {
    if (typeof input[key] === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(input[key])) {
      input[key] = moment(input[key], 'DD/MM/YYYY').toDate();
    } else if (typeof input[key] === 'object') {
      input[key] = convertDateStringsToDates(input[key]);
    }
  }
  return input
}

const convertedJson = convertDateStringsToDates(data);
var jsonDataConverted = JSON.stringify(convertedJson,null,2);

// save the result json
fs.writeFile('empregoCientificoFormatado.json', jsonDataConverted, 'utf8', function(err) {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log('File saved successfully!');
    }
  });