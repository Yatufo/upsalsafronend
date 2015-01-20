var calendar = require('../sync/google-calendar-api.js');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();

data.connect();

var query = {
    updateMin: new Date() 
};




calendar.findAll(query, function(err, eventList) {
    if (err) throw err;

    eventList.forEach(function(lEvent) {
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
