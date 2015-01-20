//Config for the app
var data = require('./model/core-data.js');
var ctx = require('./util/conf.js').context();
//
// 
exports.findAll = function(req, res) {


    var timeMin = (ctx.SIMULATED_NOW ? ctx.SIMULATED_NOW : new Date().toISOString());
    var maxResults = ctx.EVENTS_MAXRESULTS;
    var localEventList = [];

    data.Event.find()
        .where("end.dateTime").gt(timeMin)
        .limit(maxResults)
        .exec(function(err, events) {
            res.send(events);
        });
};


exports.findById = function(req, res) {
    var localEventList = [];
    var params = {
        eventId: req.params.id,
        calendarId: ctx.CALENDAR_ID,
        fields: "created,description,end,id,location,recurrence,recurringEventId,originalStartTime,sequence,start,summary"
    };

    google.calendar.events.get(params, function(err, gEvent) {
        var lEvent = new LocalEvent();
        google.fillEvent(lEvent, gEvent);
        res.send(lEvent);
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
