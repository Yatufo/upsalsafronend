var data = require('../model/core-data.js');

//
// 
exports.create = function(req, res) {

    var locationData = new data.Location(req.body);
    locationData.save(function(err) {
        if (err) {
            console.log('there was an error trying to save the locationData', err);
            return;
        } else {
            console.log("Saved");
        }

    });
    res.status(200).send();
};


//
// 
exports.findAll = function(req, res) {

    var maxResults = ctx.EVENTS_MAXRESULTS;

    data.Location.find()
        .select('name url phone coordinates.latitude coordinates.longitude')
        .limit(maxResults)
        .exec(function(err, locations) {
            res.send(locations);
        });
};
