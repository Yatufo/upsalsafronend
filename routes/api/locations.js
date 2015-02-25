var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();


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

    var maxResults = ctx.LOCATIONS_MAXRESULTS;

    data.Location.find()
        .select('-_id id name url phone address coordinates.latitude coordinates.longitude')
        .limit(maxResults)
        .exec(function(err, locations) {
            res.send(locations);
        });
};



exports.findById = function(req, res) {

console.log('Calling this shit');
    data.Location.findOne({"id" : req.params.id})
        .select('-_id id name url phone address coordinates.latitude coordinates.longitude')
        .exec(function(err, singleLocation) {
            if (err) { console.error('location not found for that id: ', req.params.id, err );}
            res.send(singleLocation);
        });
};
