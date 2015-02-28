//Config for the app
var async = require('async');
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


    var conditions = {
        "start.dateTime": {
            $gt: timeMin,
            $lt: timeMax
        },
        "categories": {
            $all: filterCategories // TODO: For now it only supports querying with at least one category.
        }
    }

    var callPaginationData = function(callback) {
        data.Event.aggregate([{
                $match: conditions
            }, {
                $unwind: "$categories"
            }, {
                $group: {
                    _id: null,
                    eventsCategories: {
                        $addToSet: "$categories"
                    }
                }
            }],
            function(err, results) {
                callback(err, results);
            })
    }

    var callEventsQuery = function(callback) {

        data.Event.find()
            .where(conditions)
            .populate('location')
            .limit(maxResults)
            .sort('start.dateTime')
            .exec(function(err, events) {
                callback(err, events);
            });
    }

    async.parallel([callPaginationData, callEventsQuery],
        function(err, results) {
            if (err) {
                throw err;
            }

            var combined = results[0][0];
            if (combined) {
                combined.events = results[1];
            }

            res.send(combined);
        });


};



exports.findById = function(req, res) {

    data.Event.findById(req.params.id)
        .populate('location')
        .exec(function(err, singleEvent) {
            res.send(singleEvent);
        });
};
