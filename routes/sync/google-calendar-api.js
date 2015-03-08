var ctx = require('../util/conf.js').context();
var google = require('./google-core.js');
var converter = require('./google-converter.js');


//
// 
exports.findAllEvents = function(syncParams, callback) {
    var localEventList = [];


    var params = {
        fields: "summary,description,nextPageToken,nextSyncToken,items(created,description,end,id,location,recurrence,recurringEventId,originalStartTime,sequence,start,summary),summary,timeZone,updated"
    };

    if (syncParams.calendarId) params.calendarId = syncParams.calendarId;
    if (syncParams.updateMin) params.updateMin = syncParams.updateMin;
    if (syncParams.syncToken) params.syncToken = syncParams.syncToken;
    if (syncParams.pageToken) params.pageToken = syncParams.pageToken;



    google.calendar.events.list(params, function(err, cal) {

        if (err) {
            console.error("Could not get the events from google", err);
        }

        if (cal && cal.items) {
            cal.items.forEach(function(gEvent) {
                //trick to get the location from the summary of the calendar, assuming that is the id of the location.
                if (!gEvent.location){ 
                    gEvent.location = cal.summary;
                }

                converter.convert(gEvent, function(err, lEvent) {
                    localEventList.push(lEvent);
                });
            });
        }

        callback(localEventList, cal);
    });
};

exports.findAllCalendars = function(callback) {
    var params = {
        fields: "items(id,summary,accessRole)"
    };

    google.calendar.calendarList.list(params, function(err, gCalendars) {
        if (err) {
            console.error('Not able to query calendars from google', err);
        }

        callback(gCalendars);
    })
}
