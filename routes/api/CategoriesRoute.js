var data = require('../model/core-data.js');

//
//
exports.findAll = function(req, res) {

    data.Category.find()
        .select('id name categories parent')
        .populate({
            path: 'categories',
            select: 'id name categories parent',
        })
        .exec(function(err, categories) {
            if (err) console.log(err);

            res.send(categories);
        });

};
