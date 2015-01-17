//Config for the route
var fs = require('fs');
var data = require('../model/core-data.js');
var ctx = require('../util/conf.js').context();
//
//
//
data.connect();

var saveCategory = function(lCategory) {
    var categoryData = new data.Category(lCategory);
    console.log(lCategory.name);
    categoryData.save(function(err) {
        if (err) {
            console.log('there was an error trying to save the categoryData', err);
            return;
        }
    });
    return categoryData;
}


var syncCategory = function(lParent) {

    saveCategory(lParent);

    if (lParent.categories) {
        lParent.categories.forEach(function(lChild) {
            syncCategory(lChild);
        });
    }

}


var rootCategory = JSON.parse(fs.readFileSync(ctx.CATEGORIES_JSON, 'utf8'));

syncCategory(rootCategory);
