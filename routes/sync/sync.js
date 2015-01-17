var calendar = require('./google-calendar-api.js');
var data = require('../model/schema.js');

data.connect();


var lEvent = {
    "start": {
        "dateTime": 1413293400000
    },
    "end": {
        "dateTime": 1413297000000
    },
    "duration": 1,
    "sync": {
        "uid": "d308o2iid11dva9p04n49fidvk",
        "lastUpdate": "2015-01-15T02:56:13.858Z"
    },
    "demonio":"ash",
    "location": "Comomango Dance Company, 486 Rue Sainte-Catherine Ouest, Montréal, QC H3B 1A6, Canada",
    "summary": "Dance",
}


var eventData = new data.Event(lEvent);
eventData.save(function(err) {
    if (err) {
        console.log('there was an error trying to save the eventData', err);
        return;
    }
    data.disconnect();
});






// calendar.findAll(function(err, eventList) {
//     eventList.forEach(function(lEvent) {
//         console.log(JSON.stringify(lEvent));
//         var eventData = new data.Event(lEvent);
//         eventData.save(function(err) {
//             if (err) {
//                 console.log('there was an error trying to save the eventData', err);
//                 return;
//             }
//             console.log("saved");
//         });
//     });
// });


// data.disconnect();
