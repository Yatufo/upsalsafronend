var data = require('../routes/model/core-data.js');
var Promise = require('promise');
var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({
  delimiter: ',',
  trim: true,
  rtrim: true,
  ltrim: true
}, function(err, locationTable) {

  savePromises = locationTable.map(function(locationRow) {
    var location = {
      "id": locationRow[0],
      "name": locationRow[1],
      "address": locationRow[2],
      "url": locationRow[3],
      "phone": locationRow[4],
      "coordinates": {
        "latitude": locationRow[5],
        "longitude": locationRow[6]
      }
    };
    var locationData = new data.Location(location);
    return new Promise(function(resolve, reject) {
      locationData.save(function(e) {
        if (e) reject(e);
        else resolve(location.id);
      })
    });
  });

  Promise.all(savePromises).then(function(values) {
    console.log("Saved location ids", values);
    data.disconnect();
    process.exit(1);
  });

});
fs.createReadStream(__dirname + '/locations.csv').pipe(parser);
