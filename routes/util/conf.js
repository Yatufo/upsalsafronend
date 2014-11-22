// Configuration for the nodejs server app.
module.exports.context = function(env) {

    if (process.env.DEPLOY_ENVIRONMENT) {
        configuration.currentEnvironment = process.env.DEPLOY_ENVIRONMENT
    }

    console.log("Using the environment: " + configuration.currentEnvironment);
    return configuration[configuration.currentEnvironment];
}

var configuration = {
    "currentEnvironment": "dev",
    "dev": {
        "googlesetup": {
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "client_email": "",
            "client_id": "119283461111-u9f8f4jgkacvocdsbdnv5u1gh73ubgku.apps.googleusercontent.com",
            "client_secret": "H9oDB_HecYd7oE28IGeOUe_v",
            "client_x509_cert_url": "",
            "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "oob"],
            "token_uri": "https://accounts.google.com/o/oauth2/token"
        },
        "googletokens": {
            "token_type": "Bearer",
            "refresh_token": "1/i9d-bkIj72CybGpMGwA25qTs2GZc7Gs7CdnyzB9Ud-Y",
            "expiry_date": 1413232433845
        },
        "CALENDAR_ID": "project.demonio@gmail.com",
        "CATEGORIES_JSON": "./data/categories.json",
        "SIMULATED_NOW": "2014-10-01T04:00:01.000Z",
        "EVENTS_MAXRESULTS": 200,
        "EVENTS_SINGLE" : true
    },
    "prod": {
        "googlesetup": {
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "client_email": "",
            "client_id": "119283461111-u9f8f4jgkacvocdsbdnv5u1gh73ubgku.apps.googleusercontent.com",
            "client_secret": "H9oDB_HecYd7oE28IGeOUe_v",
            "client_x509_cert_url": "",
            "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "oob"],
            "token_uri": "https://accounts.google.com/o/oauth2/token"
        },
        "googletokens": {
            "token_type": "Bearer",
            "refresh_token": "1/F1cIzWX9ajNlUYMSMVMQ7RkmRkC3p5ejWtf7zZ6Gznw",
            "expiry_date": 1415075847934
        },
        "CALENDAR_ID": "upsalsa@gmail.com",
        "CATEGORIES_JSON": "./data/categories.json",
        "SIMULATED_NOW": false,
        "EVENTS_MAXRESULTS": 20,
        "EVENTS_SINGLE" : true,
        "prerenderToken": "jJ9tuSryPgzvzFEytcA2"
    }


};