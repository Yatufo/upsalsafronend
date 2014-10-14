//
//
//Main App   
var express = require('express');
var events = require('./routes/events.js');
var app = express();
app.get('/events', events.findAll);



app.listen(3000);
console.log('Listening on port 3000...');
