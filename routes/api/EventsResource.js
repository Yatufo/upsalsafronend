//Config for the app
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();
//
// 
exports.search = function(req, res) {

    var filterCategories = null;
    if (req.query.categories) {
        filterCategories = req.query.categories.split(",");
    }

    var timeMin = (ctx.SIMULATED_NOW ? new Date(ctx.SIMULATED_NOW) : new Date());
    var timeMax = new Date(timeMin.getTime() + ctx.EVENT_SEARCH_TIMEMAX);

    var maxResults = ctx.EVENTS_MAXRESULTS;
    var localEventList = [];

    data.Event.find()
        .where("start.dateTime").gt(timeMin)
        .where("start.dateTime").lt(timeMax)
        .all("categories", filterCategories) // TODO: For now it only supports querying with at least one category.
        .populate('location')
        .limit(maxResults)
        .sort('start.dateTime')
        .exec(function(err, events) {

            var results = {
                events: events
            };

            res.send(results);
        });
};



exports.findById = function(req, res) {

    data.Event.findById(req.params.id)
        .populate('location')
        .exec(function(err, singleEvent) {
            res.send(singleEvent);
        });
};
