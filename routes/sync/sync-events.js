var calendar = require('../sync/google-calendar-api.js');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();

data.connect();

var syncParams = {
    syncToken: null,
    pageToken: null
};

//read sycn tock
if (syncParams.syncToken) {
    console.log("Performing incremental sync");
} else {
    console.log("Performing full sync for the latest events");
    syncParams.updateMin = new Date(new Date().getTime() - ctx.UPDATE_MIN_SUBSTRACTION);
}



var syncEvents = function(syncParams){

    calendar.findAll(syncParams, function(localEventList, cal) {
     
        localEventList.forEach(function(lEvent) {
            var eventData = new data.Event(lEvent);
            eventData.save(function(err) {
                if (err) {
                    console.log('there was an error trying to save the eventData', err);
                    return;
                }
                console.log("saved");
            });
        });

        if (cal.nextPageToken) {
        	syncParams.pageToken = cal.nextPageToken;
        	syncEvents(syncParams); // Continue until the end of the pages
        }

        if (cal.nextSyncToken){
	        syncParams.syncToken = cal.nextSyncToken;
        	console.log("Demono" + JSON.stringify(syncParams));
	        //save the sync token and try later.
        }

    });
}


syncEvents(syncParams);

