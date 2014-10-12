var options = {
    hostname: 'encrypted.google.com',
    port: 443,
    path: '/',
    method: 'GET',
    ca: fs.readFileSync('certs/localhost.der'),
    agent: false
};



var req = https.request(options, function(res) {
        console.log(res);
    }