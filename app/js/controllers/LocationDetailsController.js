

/* Controllers */

eventify
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService) {

      var resetSummaries = function(){
        if ($scope.location){
          $scope.location.summaries = ratingService.generateSummaries($scope.location);
        }
      };

      $scope.createEvent = function() {
        $scope.creatingEvent = true;
      }

      $scope.onEvent = function(event) {
        $scope.creatingEvent = false;
        console.log("notified", event);
      }

      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetSummaries();
        }
      });

      Location.get({
        locationId: $routeParams.locationId
      }, function(location) {
        console.log(location);

        maps.init(location, 14);
        maps.addLocation(location);
        location.showComments = true;

        $scope.location = location;
        resetSummaries();
      });

      window.scrollTo(0, 0);
    }
  ]);
