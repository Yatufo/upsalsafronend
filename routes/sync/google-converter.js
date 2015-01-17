//This how the tags about the event are contained in the decription
var jsonRegex = /\{.*?\}/;

//Converts google calendar to the app structure
exports.convert = function(gEvent, callback) {

    var lEvent = new Event();

    //TODO: Validate nulls and data in general
    lEvent.start.dateTime = Date.parse(gEvent.start.dateTime);
    lEvent.end.dateTime = Date.parse(gEvent.end.dateTime);
    lEvent.duration = Math.round((lEvent.end.dateTime - lEvent.start.dateTime) / 360000) / 10;

    lEvent.timeZone = gEvent.timeZone;
    lEvent.sync = {
        "uid" : gEvent.id,
        "lastUpdate": new Date()
    };
    lEvent.location = gEvent.location;
    lEvent.title = gEvent.summary;
    lEvent.id = gEvent.id;

    try {
        if (gEvent.description) {
            jsonContent = gEvent.description.match(jsonRegex);
            lEvent.categories = JSON.parse(jsonContent).categories;
        }
    } catch (err) {
        console.log("Not able to parse the categories from google:", err, gEvent.description, "ID: ", gEvent.id)
    }


    callback(undefined, lEvent);
}


var Event = function() {
    this.start = {
        "dateTime": {}
    };
    this.end = {
        "dateTime": {}
    };
    this.timeZone = "";
};
