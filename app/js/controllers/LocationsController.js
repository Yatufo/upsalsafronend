/* Controllers */

eventify
  .controller('LocationsController', ['$scope', '$rootScope', '$window', 'Location', 'MapsService', 'RatingService', 'CategoryService', 'AnalyticsService', 'UtilService',
    function($scope, $rootScope, $window, Location, maps, ratingService, categoryService, analytics, util) {

      $scope.allLocations = [];
      $scope.loading = true;
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

      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetSummaries();
        }
      });

      var resetSummaries = function() {
        categoryService.getCategories().then(function(categories) {

          $scope.allLocations.forEach(function(location) {
            location.summaries = ratingService.generateSummaries(location, categories);
          });

        });
      };

      Location.query({}, function(locations) {
        $scope.allLocations = locations;

        $scope.allLocations.forEach(function(location) {
          location.detailsUrl = util.getDetailsUrl(location, "location");
          location.showComments = SHOW_COMMENTS; // TODO: Change when there are too many comments
        });

        $scope.loadMore();
        resetSummaries();
        reloadMap($scope.allLocations);
        $scope.loading = false;
      });

      //TODO: Reuse this code which is also in the locations
      function reloadMap(locations, forceReload) {
        if ($scope.isMapVisible && (forceReload || !$scope.isMapLoaded)) {
          maps.init();
          locations.forEach(function(location) {
            maps.addLocation(location);
          });
          $scope.isMapLoaded = true;
        }
      }

      $scope.isMobile = maps.isMobile();
      $scope.isListVisible = true;
      $scope.isMapVisible = !($scope.isMobile && $scope.isListVisible)
      $scope.canToggleView = $scope.isMobile;
      $scope.isMapLoaded = false;

      $scope.toogleView = function() {

        analytics.track({
          category: 'usage',
          action: 'toogleMap',
          url: $window.location
        });

        $scope.isMapVisible = !$scope.isMapVisible;
        $scope.isListVisible = !$scope.isListVisible;


        reloadMap($scope.allLocations);
      };

      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      };


      window.scrollTo(0, 0);
    }
  ]);
