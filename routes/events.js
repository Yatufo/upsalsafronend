//Config for the app
var google = require('../lib/google.js');
var config = require('../lib/conf.js');
var ctx = config('dev').context();
//
// 
exports.findAll = function(req, res) {
    var LocalEventList = [];
    var params = {
        calendarId: ctx.CALENDAR_ID
    };
    google.calendar.events.list(params, function(err, cal) {
        console.log('Error: ', err);
        cal.items.forEach(function(gEvent) {
            var lEvent = new LocalEvent();
            google.fillEvent(lEvent, gEvent)
            LocalEventList.push(lEvent);
        });
        res.send(LocalEventList);
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