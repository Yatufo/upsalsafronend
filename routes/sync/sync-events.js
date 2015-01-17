var calendar = require('../sync/google-calendar-api.js');
var data = require('../model/core-data.js');

data.connect();

calendar.findAll(function(err, eventList) {
    eventList.forEach(function(lEvent) {
        console.log(JSON.stringify(lEvent) + "\n\n\n\n");
        var eventData = new data.Event(lEvent);
        eventData.save(function(err) {
            if (err) {
                console.log('there was an error trying to save the eventData', err);
                return;
            }
            console.log("saved");
        });
    });
});


