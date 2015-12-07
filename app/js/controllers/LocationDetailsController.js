/* Controllers */

eventify
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$window', '$routeParams', 'Location', 'MapsService', 'RatingService', 'CONFIG',
    function($rootScope, $scope, $window, $routeParams, Location, maps, ratingService, conf) {

      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = ! ($scope.isMobile && $scope.isListVisible)
      $scope.categories = ['party', 'week'];

      var resetSummaries = function() {
        if ($scope.location) {
          $scope.location.summaries = ratingService.generateSummaries($scope.location);
        }
      };

      $scope.$on('event', function(e, event) {
        if (event) {
          $scope.events.push(event);
        }
      });

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
        locationId: $routeParams.locationId,
        categories: $scope.categories.join(conf.ARRAY_PARAM_SEPARATOR)
      }, function(events) {
        $scope.events = events || [];
        $scope.events.forEach(function(event) {
          event.detailsUrl = $window.location.origin + '/' + $rootScope.city + '/events/' + event.id;
        })
      })

      window.scrollTo(0, 0);
    }
  ]);
