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
        var toIndex = fromIndex + $scope.pageSize;

        if (!$scope.allLocations || $scope.allLocations.length <= fromIndex) return;

        var batch = _.slice($scope.allLocations, fromIndex, toIndex)

        resetSummaries(batch);

        batch.forEach(function(location) {
          $scope.locations.push(location);
        });

        $scope.currentPage++;
      };


      categoryService.getCategories().then(function(categories) {
        $scope.categories = categories;
      });

      $scope.$watch('categories', function() {
        resetSummaries($scope.locations);
      });

      $rootScope.$watch('user.ratings', function(ratings) {
        if (ratings) {
          resetSummaries($scope.locations);
        }
      });

      var resetSummaries = function(locations) {
        if ($scope.categories) {
          locations.forEach(function(location) {
            location.summaries = ratingService.generateSummaries(location, $scope.categories);
          });
        }
      };


      Location.query({}, function(locations) {
        $scope.allLocations = locations;

        $scope.allLocations.forEach(function(location) {
          location.detailsUrl = util.getDetailsUrl(location, "location");
          location.showComments = SHOW_COMMENTS; // TODO: Change when there are too many comments
        });

        $scope.loadMore();
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





      //TODO: Reuse
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
