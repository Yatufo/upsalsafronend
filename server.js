//
//
//Main App   
var express = require('express');
var events = require('./routes/events.js');
var categories = require('./routes/categories.js');
var app = express();

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public/app'));
app.get('/api/events', events.findAll);
app.get('/api/categories', categories.findAll);


process.on('uncaughtException', function (error) {
   console.log(error.stack);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
