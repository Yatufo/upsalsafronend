//
//
//Main App   
var express = require('express');
var bodyParser = require('body-parser')
var events = require('./routes/api/events.js');
var locations = require('./routes/api/locations.js');
var categories = require('./routes/api/categories.js');
var backoffice = require('./routes/api/backoffice.js');
var ctx = require('./routes/util/conf.js').context('prod');
var app = express();



if (ctx.prerenderToken) {
    console.log("Prerender On");
    app.use(require('prerender-node').set('prerenderToken', ctx.prerenderToken));
}



app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public/app'));

app.get('/api/events', events.findAll);
app.get('/api/events/:id', events.findById);
app.get('/api/categories', categories.findAll);
app.post('/api/locations', locations.create);
app.get('/api/sync', backoffice.syncEvents);


app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})
