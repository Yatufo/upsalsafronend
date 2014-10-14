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
    var localEventList = [];
    
    cal.items.forEach(function(e) {
        localEventList.push(convertGoogleCalendar(e));
    });
    console.log(localEventList);
});


function LocalEvent(){
    this.start = {"dateTime" : {}};
    this.end = {"dateTime" : {}};
    this.timeZone = "";
};

//Converts google calendar to the app structure
function convertGoogleCalendar(event){
    var localEvent = new LocalEvent();

    localEvent.start.startDate = event.start.dateTime
    localEvent.end.startDate = event.end.dateTime
    localEvent.timeZone = event.timeZone
    localEvent.id = event.id
    localEvent.location = event.location
    localEvent.summary = event.summary
    localEvent.id = event.id

    return localEvent;
}


//Start using the service    
var express = require('express');
var app = express();
app.get('/', function(req, res) {
    res.send('hello world');
});
app.listen(3000);
console.log('Listening on port 3000...');