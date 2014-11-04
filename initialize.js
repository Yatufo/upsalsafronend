// This script should be used along with the url:
// https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=119283461111-u9f8f4jgkacvocdsbdnv5u1gh73ubgku.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob
// the url is being set for the upsalsa application

var google = require('googleapis');
var fs = require('fs');

//Config for the app
var ctx = require('./lib/conf.js').context();

//
//Google credential
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(ctx.googlesetup.client_id, ctx.googlesetup.client_secret, ctx.googlesetup.redirect_uris[0]);

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the code here:', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
        var sTokens = JSON.stringify(tokens);
        fs.appendFile("conf/oauth2google-tokens.json", sTokens);
    });
});