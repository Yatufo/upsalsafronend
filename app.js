var google = require('./lib/google.js');
var config = require('./lib/conf.js');
//Config for the app
var ctx = config('dev').context();
//
//Call the service
var params = {
    calendarId: ctx.CALENDAR_ID
};
google.calendar.events.list(params, function(err, cal) {
    console.log('Error: ', err);
    var LocalEventList = [];
    
    cal.items.forEach(function(gEvent) {
        var lEvent = new LocalEvent();
        google.fillEvent(lEvent, gEvent)
        LocalEventList.push(lEvent);
    });
    console.log(LocalEventList);
});


function LocalEvent(){
    this.start = {"dateTime" : {}};
    this.end = {"dateTime" : {}};
    this.timeZone = "";
};



//Start using the service    
var express = require('express');
var app = express();
app.get('/', function(req, res) {
    res.send('hello world');
});
app.listen(3000);
console.log('Listening on port 3000...');