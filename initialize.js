var google = require('googleapis');
var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf/client-secret.json', 'utf8'));
var CLIENT_ID = conf.installed.client_id;
var CLIENT_SECRET = conf.installed.client_secret;
var REDIRECT_URL = conf.installed.redirect_uris[0];
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// generate consent page url
var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/calendar' // can be a space-delimited string or an array of scopes
});

rl.question('Enter the code here:', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
        // set tokens to the client
        // TODO: tokens should be set by OAuth2 client.
        console.log('Tokens: ', JSON.stringify(tokens));
        oauth2Client.setCredentials(tokens);
    });
});