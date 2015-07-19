var googleCalendar = require('../sync/google-calendar-api.js');
var google = require('../sync/google-core.js');
var ctx = require('../util/conf.js').context();

var mail = "goodhelper999@gmail.com";


googleCalendar.findAllCalendars(function(gCalendars) {
    if (gCalendars && gCalendars.items) {
        gCalendars.items.forEach(function(gCal) {
            if (ctx.SYNC_CALENDAR_ACCESSROLE === gCal.accessRole && gCal.id.indexOf("upsalsa") < 0) {
                console.log('Deleting permisions to ', gCal.id);

                var params = {
                    calendarId: gCal.id,
                    ruleId: "user:goodhelper999@gmail.com"
                };

                google.calendar.acl.delete(params, function(err, response) {
                    console.log(err, response);
                });
            }
        });
    }
});
