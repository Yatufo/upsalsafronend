'use strict';

/* App Module */

angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    scope: {
      ratings: '='
    },
    controller: ['$scope', 'Rating', function($scope, Rating) {

      var updateVoteSummaryLocally = function(rating, newVote) {
        rating.votes = rating.votes || [];
        var oldVote = rating.vote;
        //Decrease the value of the userVote rating
        if (oldVote && rating.votes[oldVote]) {
          rating.votes[oldVote] = rating.votes[oldVote] - 1 || undefined;
        }
        rating.votes[newVote] = rating.votes[newVote] + 1 || 1;
      }

      var saveOrUpdateRating = function(rating, done) {
        var resource = new Rating({
          id: rating.id,
          location: rating.location.id,
          category: rating.category.id,
          vote: rating.vote
        });

        if (!resource.id) {
          resource.$save(function(saved, putResponseHeaders) {
            rating.id = saved.id;
            done();
          });
        } else {
          Rating.update(resource, function(){
            done();
          });
        }
      }

      $scope.resetUnvotedRating = function() {
        $scope.current = undefined;
        if ($scope.ratings) {
          $scope.ratings.slice().reverse().forEach(function(rating) {
            if (!rating.votes) {
              $scope.current = rating;
            }
          });
        }
      };

      $scope.rate = function(rating, userVote) {

        //if there are no changes in the vote
        if (rating.vote && rating.vote === userVote)
          return false;

        saveOrUpdateRating(rating, function() {
          updateVoteSummaryLocally(rating, userVote);

          rating.vote = userVote;
          rating.isUp = (rating.vote === 'up');
          rating.isDown = (rating.vote === 'down');

          $scope.resetUnvotedRating();
        });

      }

      $scope.resetUnvotedRating();

    }],
    templateUrl: 'views/components/rating.html'
  };
});
