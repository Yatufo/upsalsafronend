var calendar = require('../sync/google-calendar-api.js');
var recurrence = require('../sync/events-recurrence.js');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();




exports.synchronize = function(syncParams, callback) {

    calendar.findAllEvents(syncParams, function(localEventList, cal) {

        localEventList.forEach(function(lEvent) {

            deleteExistingEvent(lEvent);

            addLocationData(lEvent, function() {
                if (lEvent.recurrence) {
                    recurrence.createRecurrentEvents(lEvent, function(rEvents) {
                        rEvents.forEach(function(rEvent) {
                            saveEvent(rEvent);
                        });
                    })
                } else {
                    saveEvent(lEvent);
                }
            });
        });

        if (cal.nextPageToken) {
            syncParams.pageToken = cal.nextPageToken;
            synchronizeEvents(syncParams); // Continue until the end of the pages
        }

        if (cal.nextSyncToken) {
            callback(cal.nextSyncToken);
        }

    });
}


var deleteExistingEvent = function(lEvent) {
    if (lEvent.sync) {
        data.Event.remove({
            "sync.uid": lEvent.sync.uid
        }, function(err) {
            if (err) console.error('Error trying to delete outdated events uid: ', lEvent.sync.uid, err);
        });
    }
};


var saveEvent = function(lEvent) {
    new data.Event(lEvent).save(function(err) {
        if (err) {
            console.error('there was an error trying to save the eventData', err, lEvent);
        }
    });
}


var addLocationData = function(lEvent, callback) {
    if (lEvent.location && lEvent.location.id) {

        data.Location.findOne({
            "id": lEvent.location.id
        }).select('_id').exec(function(err, location) {
            if (!err && location) {
                lEvent.location = location._id;
            } else {
                lEvent.location = null;
            }
            callback();
        })
    } else {
        lEvent.location = null;
        console.error("LOCATION: No location found for: ", lEvent.title, "Start: ", lEvent.start);
        callback();
    }
}
