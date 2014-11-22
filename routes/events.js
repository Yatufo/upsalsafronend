//Config for the app
var google = require('./util/google.js');
var ctx = require('./util/conf.js').context();
//
// 
exports.findAll = function(req, res) {
    var localEventList = [];
    var params = {
        orderBy : "startTime",
        singleEvents: ctx.EVENTS_SINGLE,
        calendarId: ctx.CALENDAR_ID,
        timeMin: (ctx.SIMULATED_NOW ? ctx.SIMULATED_NOW : new Date().toISOString()),
        maxResults: ctx.EVENTS_MAXRESULTS,
        fields : "description,items(created,description,end,id,location,recurrence,recurringEventId,sequence,start,summary),summary,timeZone,updated"
    };

    google.calendar.events.list(params, function(err, cal) {

        if (cal != null && cal.items != null) {
            cal.items.forEach(function(gEvent) {
                var lEvent = new LocalEvent();
                google.fillEvent(lEvent, gEvent)
                localEventList.push(lEvent);
            });
        }
        res.send(localEventList);
    });
};

function LocalEvent() {
    this.start = {
        "dateTime": {}
    };
    this.end = {
        "dateTime": {}
    };
    this.timeZone = "";
};