/* Controllers */

eventify
  .controller('LocationsController', ['$scope', '$rootScope', '$window', 'Location', 'MapsService', 'RatingService', 'AnalyticsService',
    function($scope, $rootScope, $window, Location, maps, ratingService, analytics) {

      $scope.allLocations = [];
      $scope.loading = true;
      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = ! ($scope.isMobile && $scope.isListVisible)
      $scope.canToggleView = $scope.isMobile;
      $scope.isMapLoaded = false;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.locations = [];
      var SHOW_COMMENTS = false;

      $scope.loadMore = function() {

        var fromIndex = $scope.currentPage * $scope.pageSize;
        var toIndex = fromIndex + $scope.pageSize - 1;

        if (!$scope.allLocations || $scope.allLocations.length <= fromIndex) return;

        for (var i = fromIndex; i <= toIndex; i++) {
          if ($scope.allLocations[i]) {
            $scope.locations.push($scope.allLocations[i]);
          }
        }

        $scope.currentPage++;
      };


      function reloadMap(forceReload) {
        if ($scope.isMapVisible && (forceReload || !$scope.isMapLoaded)) {
          maps.init();
          $scope.allLocations.forEach(function(location) {
            maps.addLocation(location);
          });
          $scope.isMapLoaded = true;
        }
      }

      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetSummaries();
        }
      });

      var resetSummaries = function() {
        $scope.allLocations.forEach(function(location) {
          location.summaries = ratingService.generateSummaries(location);
        });
      };

      Location.query({}, function(locations) {
        $scope.allLocations = locations;

        $scope.allLocations.forEach(function(location) {
          location.detailsUrl = $window.location.origin + '/' + $rootScope.city + '/locations/' + location.id;
          location.showComments = SHOW_COMMENTS; // TODO: Change when there are too many comments
        });

        $scope.loadMore();
        resetSummaries();
        reloadMap();
        $scope.loading = false;
      });

      $scope.toogleView = function() {

        analytics.track({
          category: 'usage',
          action: 'toogleMap',
          url: $window.location
        });

        $scope.isMapVisible = !$scope.isMapVisible;
        $scope.isListVisible = !$scope.isListVisible;


        reloadMap();
      };

      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      };

      window.scrollTo(0, 0);
    }
  ]);
