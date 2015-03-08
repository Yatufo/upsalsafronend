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
        lEvent.duration = Math.round((lEvent.end.dateTime - lEvent.start.dateTime) / 360000) / 10; // in hours
        lEvent.recurrence = gEvent.recurrence;


        lEvent.timeZone = gEvent.timeZone;
        lEvent.sync = {
            uid: gEvent.id,
            lastUpdate: new Date()
        };
        lEvent.title = gEvent.summary;
        lEvent.id = gEvent.id;

        var genericContent = parseDescription(gEvent);
        lEvent.categories = genericContent.categories;
        lEvent.location = {
            id: genericContent.locationCode
        };

    } catch (err) {
        console.log("CONVERT - Not able to process the event from google: ", err, "Summary: ", gEvent.summary);
    }


    callback(undefined, lEvent);
}


var parseDescription = function(gEvent) {
    var result = {};
    try {
        var description = gEvent.description.trim();
        if (description.indexOf('{') < 0) {
            var lines = description.split('\n');
            lines.forEach(function(element) {
                var fields = element.split(':');
                result[fields[0]] = fields[1].split(',');
            });
        } else {
            result = JSON.parse(description);
        }

        if (!result.locationCode) {
            result.locationCode = gEvent.location;
        }
    } catch (err) {
        console.log("CONVERT - Not able to process the description from event: ", description, err, gEvent);
    }
    return result;
}
