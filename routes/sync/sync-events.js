var calendar = require('../sync/google-calendar-api.js');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();


exports.syncEvents = function(req, res) {

    var syncParams = {
        syncToken: ctx.EVENT_SYNC_TOKEN,
        pageToken: null
    };

    //read sycn tock
    if (syncParams.syncToken) {
        console.log("Performing incremental sync");
    } else {
        console.log("Performing full sync for the latest events");
        syncParams.updateMin = new Date(new Date().getTime() - ctx.UPDATE_MIN_SUBSTRACTION);
    }

    syncEvents(syncParams);

    res.send("request received");
}




var syncEvents = function(syncParams) {

    calendar.findAll(syncParams, function(localEventList, cal) {

        localEventList.forEach(function(lEvent) {

            createEventData(lEvent, function(eventData) {
                eventData.save(function(err) {
                    if (err) {
                        console.log('there was an error trying to save the eventData', err);
                        return;
                    }
                });
            });
        });

        if (cal.nextPageToken) {
            syncParams.pageToken = cal.nextPageToken;
            syncEvents(syncParams); // Continue until the end of the pages
        }

        if (cal.nextSyncToken) {
            ctx.EVENT_SYNC_TOKEN = cal.nextSyncToken;
            console.log("Sync data for future updates: " + ctx.EVENT_SYNC_TOKEN);
            //save the sync token and try later.
        }

    });
}


var createEventData = function(lEvent, callback) {
    if (lEvent.location && lEvent.location.id) {

        data.Location.findOne({
            "id": lEvent.location.id
        }).select('_id').exec(function(err, location) {
            if (err) throw err;

            lEvent.location = location._id;
            callback(new data.Event(lEvent));
        })
    } else {
        lEvent.location = null;
        callback(new data.Event(lEvent));
        console.error("The event does not have a proper location " + lEvent.id);
    }

}
