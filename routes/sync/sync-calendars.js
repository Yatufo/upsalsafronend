var googleCalendar = require('../sync/google-calendar-api.js');
var eventsSynch = require('../sync/sync-events.js');
var ctx = require('../util/conf.js').context();



exports.synchronize = function(syncAll) {

    googleCalendar.findAllCalendars(function(gCalendars) {
        if (gCalendars && gCalendars.items) {
            gCalendars.items.forEach(function(gCal) {
                if (ctx.SYNC_CALENDAR_ACCESSROLE === gCal.accessRole) {
                    console.log("Starting sync for: ", gCal.summary);
                    synchronizeByCalendar(gCal.id, syncAll);

                } else {
                    console.log('Ignoring calendar: ', gCal.summary);
                }
            });
        }
    });
}


var synchronizeByCalendar = function(calendarId, syncAll) {

    if (syncAll || !ctx.EVENT_SYNC_TOKEN) {
        ctx.EVENT_SYNC_TOKEN = [];
    }

    var syncParams = {
        calendarId: calendarId,
        syncToken: ctx.EVENT_SYNC_TOKEN[calendarId],
        pageToken: null
    };

    //read sycn tock
    if (!syncParams.syncToken) {
        syncParams.updateMin = new Date(new Date().getTime() - ctx.UPDATE_MIN_SUBSTRACTION);
    }


    eventsSynch.synchronize(syncParams, function(nextSyncToken) {
        ctx.EVENT_SYNC_TOKEN[calendarId] = nextSyncToken;
        //save the sync token and try later.
    });
}
