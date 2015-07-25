'use strict';

/* Service */

var RatingService = function($rootScope) {

  // would get the next category the user would rate
  var getRateableCategories = function(location) {
    return ['class', 'party', 'salsa', 'bachata', 'kizomba'].map(function(id) {
      return $rootScope.categories[id];
    });
  };


  var service = {
    generateRatings: function(location) {
      var generated = [];
      var ratedCategories = [];

      location.ratings.forEach(function(rating) {
        var gRating = {
          category: $rootScope.categories[rating.category],
          votes: rating.votes,
          location: location
        };

        ratedCategories.push(gRating.category);
        generated.push(gRating);
      });

      getRateableCategories().forEach(function(category) {
        if (!_.contains(ratedCategories, category)) {
          generated.push({
            category: category,
            location: location
          });
        }
      });

      return generated;

    }
  };

  return service;

};
angular.module('eventifyServices')
  .factory('RatingService', ['$rootScope', RatingService]);