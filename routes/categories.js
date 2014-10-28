//Config for the route
var fs = require('fs');
var ctx = require('../lib/conf.js').context();
//
// 
exports.findAll = function(req, res) {

    var categoriesList = JSON.parse(fs.readFileSync(ctx.CATEGORIES_JSON, 'utf8'));
    res.send(categoriesList);

};