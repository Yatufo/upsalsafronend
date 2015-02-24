//
//Converts google calendar to the app structure
exports.convert = function(gEvent, callback) {

    var lEvent = {};

    try {

        //TODO: Validate nulls and data in general
        lEvent.start = {
            dateTime: Date.parse(gEvent.start.dateTime)
        };
        lEvent.end = {
            dateTime: Date.parse(gEvent.end.dateTime)
        };
        lEvent.duration = Math.round((lEvent.end.dateTime - lEvent.start.dateTime) / 360000) / 10;
        lEvent.recurrence = gEvent.recurrence;


        lEvent.timeZone = gEvent.timeZone;
        lEvent.sync = {
            uid: gEvent.id,
            lastUpdate: new Date()
        };
        lEvent.title = gEvent.summary;
        lEvent.id = gEvent.id;

        if (gEvent.description) {
            var genericContent = JSON.parse(gEvent.description);
            lEvent.categories = genericContent.categories;
            lEvent.location = {
                id: genericContent.locationCode
            };
        }

    } catch (err) {
        console.log("Not able to process the event from google:", err, JSON.stringify(gEvent));
    }


    callback(undefined, lEvent);
}
