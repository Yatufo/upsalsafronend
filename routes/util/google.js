var google = require('googleapis');
var ctx = require('./conf.js').context();


//
//Google credential
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(ctx.googlesetup.client_id, ctx.googlesetup.client_secret, ctx.googlesetup.redirect_uris[0]);
oauth2Client.setCredentials({
    access_token: ctx.googletokens.access_token,
    refresh_token: ctx.googletokens.refresh_token
});
google.options({
    //proxy: 'http://localhost:8080',
    //strictSSL: false,
    auth: oauth2Client
});

exports.calendar = google.calendar('v3');

//This how the tags about the event are contained in the decription
var jsonRegex = /\{.*?\}/;

//Converts google calendar to the app structure
exports.fillEvent = function(lEvent, gEvent) {

    //TODO: Validate nulls and data in general
    lEvent.start.dateTime = Date.parse(gEvent.start.dateTime);
    lEvent.end.dateTime = Date.parse(gEvent.end.dateTime);
    lEvent.duration = Math.round((lEvent.end.dateTime - lEvent.start.dateTime)/360000)/10;

    lEvent.timeZone = gEvent.timeZone;
    lEvent.id = gEvent.id;
    lEvent.location = gEvent.location;
    lEvent.summary = gEvent.summary;
    lEvent.id = gEvent.id;
    
    try {
        if (gEvent.description){
            jsonContent = gEvent.description.match(jsonRegex);
            lEvent.categories = JSON.parse(jsonContent).categories;
        }
    } catch (err) {
        console.log("Not able to parse the categories from google:", err, gEvent.description, "ID: ", gEvent.id)
    }


}