var ctx = require('../util/conf.js').context();
var google = require('./google-core.js');
var converter = require('./google-converter.js');


//
// 
exports.findAll = function(callback) {
    var localEventList = [];
    var params = {
        orderBy: "startTime",
        singleEvents: ctx.EVENTS_SINGLE,
        calendarId: ctx.CALENDAR_ID,
        timeMin: (ctx.SIMULATED_NOW ? ctx.SIMULATED_NOW : new Date().toISOString()),
        maxResults: ctx.EVENTS_MAXRESULTS,
        fields: "description,items(created,description,end,id,location,recurrence,recurringEventId,originalStartTime,sequence,start,summary),summary,timeZone,updated"
    };

    google.calendar.events.list(params, function(err, cal) {

        if (cal != null && cal.items != null) {
            cal.items.forEach(function(gEvent) {
                converter.convert(gEvent, function(err, lEvent) {
                    localEventList.push(lEvent);
                });
            });
        }

        callback(err, localEventList);
    });
};
