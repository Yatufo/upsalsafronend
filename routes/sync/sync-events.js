var RRule = require('rrule').RRule;
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
            addLocationData(lEvent, function() {
                if (lEvent.recurrence) {
                    getRecurrentEvents(lEvent, function(rEvents) {
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
            syncEvents(syncParams); // Continue until the end of the pages
        }

        if (cal.nextSyncToken) {
            ctx.EVENT_SYNC_TOKEN = cal.nextSyncToken;
            console.log("Sync data for future updates: " + ctx.EVENT_SYNC_TOKEN);
            //save the sync token and try later.
        }

    });
}

var saveEvent = function(lEvent) {
    new data.Event(lEvent).save(function(err) {
        if (err) {
            console.error('there was an error trying to save the eventData', err);
        }
    });
}


var addLocationData = function(lEvent, callback) {
    if (lEvent.location && lEvent.location.id) {

        data.Location.findOne({
            "id": lEvent.location.id
        }).select('_id').exec(function(err, location) {
            if (err) throw err;

            lEvent.location = location._id;
            callback();
        })
    } else {
        lEvent.location = null;
        console.error("The event does not have a proper location " + lEvent.id);
        callback();
    }
}

var getRecurrentEvents = function(lEvent, callback) {
    var recurrentEvents = [];
    lEvent.recurrence.forEach(function(lRule) {

        if (lRule.indexOf("RRULE:") > -1) {
            lRule = lRule.replace("RRULE:", '');
            var options = RRule.parseString(lRule);
            options.dtstart = new Date(lEvent.start.dateTime);

            var duration = lEvent.end.dateTime - lEvent.start.dateTime;
            var startDates = new RRule(options).all(function(date, i) {
                return i < ctx.MAX_REPETITIVE_EVENT
            });

            var sequence = 1;
            startDates.forEach(function(startDate, index) {
                var newEvent = cloneEvent(lEvent);
                newEvent.start.dateTime = startDate;
                newEvent.end.dateTime = Date.parse(startDate) + duration;
                newEvent.recurrence = null;
                newEvent.sequence = sequence;

                if (newEvent.sequence <= ctx.SYNC_SEASON_START_SEQ && 
                    newEvent.categories.indexOf(ctx.SYNC_SEASON_CATEGORY) != -1) {
                    newEvent.categories.push(ctx.SYNC_SEASON_START);
                }


                recurrentEvents.push(newEvent);

                sequence++;
            });
        }
    });
    callback(recurrentEvents);
}

var cloneEvent = function(lEvent) {
    return JSON.parse(JSON.stringify(lEvent));
};
