

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService) {

      var resetSummaries = function(){
        if ($scope.location)
          $scope.location.summaries = ratingService.generateRatings($scope.location);
      };

      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetSummaries();
        }
      });

      Location.get({
        locationId: $routeParams.locationId
      }, function(location) {

        maps.init(location, 14);
        maps.addLocation(location);

        $scope.location = location;
        resetSummaries();
      });

      window.scrollTo(0, 0);
    }
  ]);
