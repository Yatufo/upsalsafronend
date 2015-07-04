'use strict';

/* App Module */

angular.module('eventify').directive('rating', function() {
  return {
    restrict: 'E',
    scope: {
      ratings: '='
    },
    controller: ['$scope', function($scope) {

      $scope.reset = function() {
        $scope.current = undefined;
        $scope.ratings.forEach(function(rating) {
          if (!rating.voted ) {
            $scope.current = rating;
          }
        });
      };

      $scope.rate = function(rating, value) {
        rating.voted = value;
        rating.isUp = (rating.voted === 'up');

        if (rating[value]){
          rating[value] ++;
        } else {
          rating[value] = 1;
        }

        //TODO:call the service.
        console.log('calling teh service to save the user rate: ' + rating.category.name + 'value' + value);
        $scope.reset();
      }

      $scope.reset();

    }],
    templateUrl: 'views/components/rating.html'
  };
});
