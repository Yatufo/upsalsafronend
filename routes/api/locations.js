var data = require('../model/core-data.js');

//
// 
exports.create = function(req, res) {
                console.log("Saved" + req.body);

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
