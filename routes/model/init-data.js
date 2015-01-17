//Config for the route
var fs = require('fs');
var ctx = require('../util/conf.js').context();
// //
// // 
// exports.findAll = function(req, res) {

//     var categoriesList = JSON.parse(fs.readFileSync(ctx.CATEGORIES_JSON, 'utf8'));
//     res.send(categoriesList);

// };

var data = require('../model/schema.js');


var saveCategory = function(lCategory) {
    var categoryData = new data.Category(lCategory);
    categoryData.save(function(err) {
        if (err) {
            console.log('there was an error trying to save the categoryData', err);
            return;
        }
    });
    return categoryData;
}



data.connect();

var syncCategory = function(lParent) {

    saveCategory(lParent);
    
    if (lParent.categories) {
        lParent.categories.forEach(function(lChild) {
            saveCategory(lChild);
        });
    }

}


var rootCategory = JSON.parse(fs.readFileSync(ctx.CATEGORIES_JSON, 'utf8'));

syncCategory(rootCategory);
