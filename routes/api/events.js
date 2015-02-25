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
        .where("start.dateTime").gt(timeMin)
        .populate('location')
        .limit(maxResults)
        .sort('start.dateTime')
        .exec(function(err, events) {
            res.send(events);
        });
};


exports.findById = function(req, res) {

    data.Event.findById(req.params.id)
        .populate('location')
        .exec(function(err, singleEvent) {
            res.send(singleEvent);
        });
};
