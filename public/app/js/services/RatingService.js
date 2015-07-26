'use strict';

/* Service */

var RatingService = function($rootScope, $q, Rating) {

  // would get the next category the user would rate
  var getRateableCategories = function(location) {
    return ['class', 'party', 'salsa', 'bachata', 'kizomba'].map(function(id) {
      return $rootScope.categories[id];
    });
  };

  var setUserVote = function(summary) {
    var user = $rootScope.user;
    if (!user || !user.ratings) return;

    user.ratings.forEach(function(userRating) {
      if (userRating.location === summary.location.id &&
        userRating.category === summary.category.id) {
        summary.id = userRating._id;
        summary.vote = userRating.vote;
        summary.isUp = (summary.vote === 'up');
        summary.isDown = (summary.vote === 'down');
      }
    })
  }

  var service = {
    generateRatings: function(location) {
      var generated = [];
      var ratedCategories = [];

      location.ratings.forEach(function(rating) {
        var summary = {
          category: $rootScope.categories[rating.category],
          votes: rating.votes,
          location: location
        };

        setUserVote(summary);
        ratedCategories.push(summary.category);
        generated.push(summary);
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

    },
    saveOrUpdateRating: function(rating) {
      return $q(function(resolve, reject) {

        var resource = new Rating({
          id: rating.id,
          location: rating.location.id,
          category: rating.category.id,
          vote: rating.vote
        });

        if (!resource.id) {
          resource.$save(function (saved) {
            rating.id = saved.id;
            resolve(rating);
          }, reject);
        } else {
          Rating.update(resource, resolve, reject);
        }
      });
    }
  };

  return service;

};
angular.module('eventifyServices')
  .factory('RatingService', ['$rootScope', '$q', 'RatingResource', RatingService]);
