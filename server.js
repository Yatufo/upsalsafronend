//
//
//Main App   
var express = require('express');
var events = require('./routes/events.js');
var categories = require('./routes/categories.js');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/api/events', events.findAll);
app.get('/api/categories', categories.findAll);




app.listen(3000);
console.log('Listening on port 3000...');
