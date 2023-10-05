const fs = require('fs');

// Read data from the JSON file
const readData = () => {
  const rawData = fs.readFileSync('db.json');
  return JSON.parse(rawData);
};

// Write data to the JSON file
const writeData = (data) => {
  const stringifiedData = JSON.stringify(data, null, 2);
  fs.writeFileSync('db.json', stringifiedData);
};

module.exports = { readData, writeData };
