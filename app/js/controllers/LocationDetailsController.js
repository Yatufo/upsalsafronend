/* Controllers */

eventify
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$window', '$routeParams', 'Location', 'MapsService', 'RatingService',
    function($rootScope, $scope, $window, $routeParams, Location, maps, ratingService) {

      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = ! ($scope.isMobile && $scope.isListVisible)

      var resetSummaries = function() {
        if ($scope.location) {
          $scope.location.summaries = ratingService.generateSummaries($scope.location);
        }
      };

      $scope.createEvent = function() {
        $scope.creatingEvent = true;
      }

      $scope.onEvent = function(event) {
        $scope.creatingEvent = false;
        if (event) {
          $scope.events.push(event);
        }
      }

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
        location.showComments = true;

        $scope.location = location;
        resetSummaries();
      });

      Location.getEvents({
        locationId: $routeParams.locationId
      }, function(events) {
        $scope.events = events || [];
        $scope.events.forEach(function(event) {
          event.detailsUrl = $window.location.origin + '/' + $rootScope.city + '/events/' + event.id;
        })
      })

      window.scrollTo(0, 0);
    }
  ]);
