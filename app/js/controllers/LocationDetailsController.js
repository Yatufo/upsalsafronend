/* Controllers */

eventify
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService', 'CategoryService', 'UtilService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService, categoryService, util) {

      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = !($scope.isMobile && $scope.isListVisible)


      var resetSummaries = function() {
        categoryService.getCategories().then(function(categories) {
          if ($scope.location) {
            $scope.location.summaries = ratingService.generateSummaries($scope.location, categories);
          }
        });
      };

      $scope.$on('eventSaved', function(e, event) {
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
        location.detailsUrl = util.getDetailsUrl(location, "location");
        location.showComments = true;
        $scope.location = location;
        resetSummaries();
      });

      Location.getEvents({
        locationId: $routeParams.locationId,
        categories: []
      }, function(events) {
        $scope.events = events || [];
        $scope.events.forEach(function(event) {
          event.detailsUrl = util.getDetailsUrl(event, "event");
          event.location.id = event.id;
          event.location.name = event.name;
          event.location.detailsUrl = event.detailsUrl;

          maps.addLocation(event.location);
        })
      })


      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      };

      window.scrollTo(0, 0);
    }
  ]);
