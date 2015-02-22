var ctx = require('../util/conf.js').context();
var google = require('./google-core.js');
var converter = require('./google-converter.js');


//
// 
exports.findAll= function(syncParams, callback) {
    var localEventList = [];


    var params = {
        calendarId: ctx.CALENDAR_ID,
        fields: "description,nextPageToken,nextSyncToken,items(created,description,end,id,location,recurrence,recurringEventId,originalStartTime,sequence,start,summary),summary,timeZone,updated"
    };

    if (syncParams.updateMin) params.updateMin = syncParams.updateMin;
    if (syncParams.syncToken) params.syncToken = syncParams.syncToken;
    if (syncParams.pageToken) params.pageToken = syncParams.pageToken;



    google.calendar.events.list(params, function(err, cal) {

        if (err) {
            console.log(err);
        }

        if (cal && cal.items) {
            cal.items.forEach(function(gEvent) {
                converter.convert(gEvent, function(err, lEvent) {
                    localEventList.push(lEvent);
                });
            });
        }

        callback(localEventList, cal);
    });
};