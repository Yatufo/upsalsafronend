var locationResource = require('../api/LocationsResource.js');
var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({
    delimiter: ',',
    trim: true,
    rtrim: true,
    ltrim: true
}, function(err, locationTable) {

    locationTable.forEach(function(locationRow, index) {
        var location = {
            "body": {
                "id": locationRow[0],
                "name": locationRow[1],
                "address": locationRow[2],
                "url": locationRow[3],
                "phone": locationRow[4],
                "coordinates": {
                    "latitude": locationRow[5],
                    "longitude": locationRow[6]
                }
            }
        };
        locationResource.create(location);
    });

});
fs.createReadStream(__dirname + '/locations.csv').pipe(parser); 
