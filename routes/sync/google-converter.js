//This how the tags about the event are contained in the decription
var jsonRegex = /\{.*?\}/;

//Converts google calendar to the app structure
exports.convert = function(gEvent, callback) {

    var lEvent = {};

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

    try {
        if (gEvent.description) {
            jsonContent = gEvent.description.match(jsonRegex);
            var genericContent = JSON.parse(jsonContent);
            lEvent.categories = genericContent.categories;
            lEvent.location = { id : genericContent.locationCode }; 
        }
    } catch (err) {
        console.log("Not able to parse the categories from google:", err, gEvent.description, "ID: ", gEvent.id)
    }


    callback(undefined, lEvent);
}
