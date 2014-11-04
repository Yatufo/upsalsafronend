//Config for the app
var google = require('../lib/google.js');
var ctx = require('../lib/conf.js').context();
//
// 
exports.findAll = function(req, res) {
    var localEventList = [];
    var params = {
        calendarId: ctx.CALENDAR_ID,
        timeMin: (ctx.SIMULATED_NOW ? ctx.SIMULATED_NOW : new Date().toISOString()),
        maxResults: (ctx.EVENTS_MAXRESULTS ? ctx.EVENTS_MAXRESULTS : null)
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