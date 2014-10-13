var google = require('googleapis');
var calendar = google.calendar('v3');
//Config for the app
var config = require('./lib/conf.js');
var ctx = config('dev').initContext();

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
//
//Call the service
calendar.calendarList.list(function(err, user) {
    console.log('Error: ', err);
    console.log('User: ', user);
});
//process.exit(0);
//app.listen(3000);
//console.log('Listening on port 3000...');