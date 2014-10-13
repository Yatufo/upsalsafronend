var google = require('googleapis');
var fs = require('fs');

//Config for the app
var config = require('./lib/conf.js');
var ctx = config('dev').initContext();

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
        fs.writeFile("conf/oauth2google-tokens.json", sTokens);
    });
});