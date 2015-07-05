'use strict';

/* App Module */

angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    scope: {
      ratings: '='
    },
    controller: ['$scope', 'Rating', function($scope, Rating) {

      $scope.reset = function() {
        $scope.current = undefined;
        $scope.ratings.forEach(function(rating) {
          if (!rating.voted) {
            $scope.current = rating;
          }
        });
      };

      $scope.rate = function(rating, vote) {
        if (rating.voted && rating.voted === vote)
          return false;

        if (rating[rating.voted]) {
          rating[rating.voted]--;
        }
        rating[vote] = rating[vote] ? rating[vote] + 1 : 1


        rating.voted = vote;
        rating.isUp = (rating.voted === 'up');

        var resource = new Rating({
          id: rating.id,
          location: rating.location.id,
          category: rating.category.id,
          vote: vote
        });

        if (!resource.id) {
          resource.$save(function(saved, putResponseHeaders) {
            rating.id = saved.id;
          });
        } else {
          Rating.update(resource);
        }
      }


      $scope.reset();

    }],
    templateUrl: 'views/components/rating.html'
  };
});
