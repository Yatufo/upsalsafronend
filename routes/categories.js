//Config for the route
var fs = require('fs');
var ctx = require('./util/conf.js').context();
// //
// // 
// exports.findAll = function(req, res) {

//     var categoriesList = JSON.parse(fs.readFileSync(ctx.CATEGORIES_JSON, 'utf8'));
//     res.send(categoriesList);

// };



var data = require('../model/schema.js');

data.connect();

var categoriesList = JSON.parse(fs.readFileSync(ctx.CATEGORIES_JSON, 'utf8'));



    categoriesList.forEach(function(lCategory) {

    	console.log(lCategory);	
        var categoryData = new data.Category(lCategory);
        categoryData.save(function(err) {
            if (err) {
                console.log('there was an error trying to save the categoryData', err);
                return;
            }
        });
    });
});


data.disconnect();
