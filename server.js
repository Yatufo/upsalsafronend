//
//
//Main App   
var express = require('express');
var events = require('./routes/events.js');
var ctx = require('./routes/util/conf.js').context('prod');
var categories = require('./routes/categories.js');
var app = express();



if(ctx.prerenderToken){
	console.log("Prerender On");
	app.use(require('prerender-node').set('prerenderToken', ctx.prerenderToken));
}



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
