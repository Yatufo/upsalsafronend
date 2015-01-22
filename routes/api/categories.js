var data = require('../model/core-data.js');

//
// 
exports.findAll = function(req, res) {

    data.Category.find().exec(function(err, categories){
        if (err) console.log(err);

        res.send(categories);
    });

};

