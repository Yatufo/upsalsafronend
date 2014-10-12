var google = require('googleapis');
var calendar = google.calendar('v3');

var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf/client-secret.json', 'utf8'));
var tokens = JSON.parse(fs.readFileSync('conf/oauth2google-tokens.json', 'utf8'));
var CLIENT_ID = conf.installed.client_id;
var CLIENT_SECRET = conf.installed.client_secret;
var REDIRECT_URL = conf.installed.redirect_uris[0];
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({
  access_token: tokens.access_token,
  refresh_token: tokens.refresh_token
});

google.options({ proxy: 'http://localhost:8080', strictSSL: false, auth: oauth2Client });

calendar.calendarList.list(function(err, user) {
    console.log('Error: ', err);
    console.log('User: ', user);
});
//app.listen(3000);
//console.log('Listening on port 3000...');