var data = require('../model/core-data.js');


var location = {
    "id": "649",
    "name": "Latingroove",
    "address": "1112 Sainte - Catherine Street West Montreal, QC H3B 1 H4",
    "url": "http: //latingroove.ca/",
    "phone": "5149524808",
    "coordinates": {
        "latitude": 45.499718600,
        "longitude": -73.573094500
    }
}


var locationData = new data.Location(location);
locationData.save(function(err) {
    if (err) {
        console.log('there was an error trying to save the locationData', err);
        return;
    } else {
    	console.log("Saved");
    }

});
