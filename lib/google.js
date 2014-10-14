var google = require('googleapis');
var config = require('./conf.js');
var ctx = config('dev').context();

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


//Converts google calendar to the app structure
exports.fillEvent = function (lEvent, gEvent){

    lEvent.start.startDate = gEvent.start.dateTime
    lEvent.end.startDate = gEvent.end.dateTime
    lEvent.timeZone = gEvent.timeZone
    lEvent.id = gEvent.id
    lEvent.location = gEvent.location
    lEvent.summary = gEvent.summary
    lEvent.id = gEvent.id

}
