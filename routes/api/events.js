//Config for the app
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();
//
// 
exports.findAll = function(req, res) {


    var timeMin = (ctx.SIMULATED_NOW ? ctx.SIMULATED_NOW : new Date().toISOString());
    var maxResults = ctx.EVENTS_MAXRESULTS;
    var localEventList = [];

    data.Event.find()
        .where("end.dateTime").gt(timeMin)
        .limit(maxResults)
        .exec(function(err, events) {
            res.send(events);
        });
};


exports.findById = function(req, res) {

    data.Event.findById(req.params.id)
        .exec(function(err, singleEvent) {
            res.send(singleEvent);
        });
};



