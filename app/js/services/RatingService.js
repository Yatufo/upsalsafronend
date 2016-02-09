

/* Service */

var RatingService = function($rootScope, $q, Rating, categoryService, cfg) {


  // would get the next category the user would rate
  function getRateableCategories(categories) {
    return cfg.RATEABLE_CATEGORIES.map(function(id) {
      return categories[id];
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
    generateSummaries: function(location, categories) {

      var generated = [];
      var ratedCategories = [];
      if (!location || !location.ratings) return;


      location.ratings.forEach(function(rating) {
        var summary = {
          category: categories[rating.category],
          votes: rating.votes,
          location: location
        };

        setUserVote(summary);
        ratedCategories.push(summary.category);
        generated.push(summary);
      });

      getRateableCategories(categories).forEach(function(category) {
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
  .factory('RatingService', ['$rootScope', '$q', 'RatingResource', 'CategoryService', 'CONFIG', RatingService]);
