

/* Service */

var RatingService = function($rootScope, $q, Rating) {

  // would get the next category the user would rate
  var getRateableCategories = function(location) {
    return ['favorite', 'class', 'party', 'salsa', 'bachata', 'kizomba'].map(function(id) {
      return $rootScope.categories[id];
    });
  };

  var setUserVote = function(summary) {
    var user = $rootScope.user;
    if (!user || !user.ratings) return;

    //TODO: change to _.find
    user.ratings.forEach(function(userRating) {
      if (userRating.location === summary.location.id &&
        userRating.category === summary.category.id) {
        summary.id = userRating._id;
        summary.vote = userRating.vote;
      }
    });
  };

  var service = {
    generateSummaries: function(location) {
      var generated = [];
      var ratedCategories = [];
      if (! location || !location.ratings)
        return;


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
          var emptySummary = {
            category: category,
            location: location,
            votes : null
          };
          generated.push(emptySummary);
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
          resource.$save(function(saved) {
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
eventify
  .factory('RatingService', ['$rootScope', '$q', 'RatingResource', RatingService]);
