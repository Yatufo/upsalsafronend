var calendar = require('./google-calendar-api.js');
var data = require('../model/schema.js');

calendar.findAll(function(err, eventList) {
    eventList.forEach(function(lEvent) {
        var eventData = new data.Event(lEvent);
        eventData.save(function(err) {
            if (err) {
                console.log('Demonio');
                return;
            }
            console.log('saved');
        });
    });
});
