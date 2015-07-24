//
//
//Main App
var express = require('express');
var bodyParser = require('body-parser')
var events = require('./routes/api/EventsRoute.js');
var ratings = require('./routes/api/RatingsRoute.js');
var locations = require('./routes/api/LocationsRoute.js');
var categories = require('./routes/api/CategoriesRoute.js');
var backoffice = require('./routes/api/BackofficeRoute.js');
var jwt = require('express-jwt');

var auth = jwt({
  secret: new Buffer('_X2hz4xWqOb5zOeoCP6G0MsZnfRyvhBGuuF2P4KTZwaeOVvVR21H_hJCNRalKBgS', 'base64'),
  audience: 'DRwECJSJ3um1XVaET9b88YRvvY0STWbE'
});

var ctx = require('./routes/util/conf.js').context();
var app = express();

// gzip/deflate outgoing responses
var compression = require('compression')

if (ctx.prerenderToken) {
  console.log("Prerender On");
  app.use(require('prerender-node').set('prerenderToken', ctx.prerenderToken));
}

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(compression());


var indexPath = __dirname + ctx.PUBLIC_DIR + ctx.SITE_INDEX;
app.use(express.static(__dirname + ctx.PUBLIC_DIR, {
  maxAge: ctx.MAX_AGE_GENERAL,
  index: indexPath
}));


app.use('/assets', express.static(__dirname + ctx.PUBLIC_DIR + '/assets', {
  maxAge: ctx.MAX_AGE_ASSETS
}));

app.get('/api/events', events.search);
app.get('/api/events/:id', events.findById);
app.get('/api/categories', categories.findAll);
app.post('/api/locations', locations.create);
app.get('/api/locations', locations.findAll);
app.get('/api/locations/:id', locations.findById);
app.post('/api/ratings', auth, ratings.create);
app.put('/api/ratings/:id', auth, ratings.update);
app.get('/api/sync', backoffice.syncEvents);


// This will ensure that all routing is handed over to AngularJS
app.get('/*', function(req, res) {
  res.sendFile(indexPath);
});


app.use(function(err, req, res, next) {

  if (err.name === 'UnauthorizedError') {
    res.send(401, 'Invalid Token');
  } else {
    console.error(err);
    res.status(500).send('Something broke!');
  }

  next;
});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
