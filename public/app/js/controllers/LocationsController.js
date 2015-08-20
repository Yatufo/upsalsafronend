/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationsController', ['$scope', '$rootScope', '$window', 'Location', 'MapsService', 'RatingService',
    function($scope, $rootScope, $window, Location, maps, ratingService) {

      $scope.allLocations = [];
      $scope.loading = true;
      $scope.isMapView = maps.isMapVisible();
      $scope.isListView = true;
      $scope.canToggleView = !$scope.isMapView;
      $scope.isMapLoaded = false;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.locations = [];

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
      }


      function reloadMap(forceReload) {
        if ($scope.isMapView && (forceReload || !$scope.isMapLoaded)) {
          maps.init();
          $scope.allLocations.forEach(function(location) {
            maps.addLocation(location);
          });
          $scope.isMapLoaded = true;
        }
      };

      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetSummaries();
        }
      });

      var resetSummaries = function() {
        $scope.allLocations.forEach(function(location) {
          location.summaries = ratingService.generateRatings(location);
        });
      }

      Location.query({}, function(locations) {
        $scope.allLocations = locations;

        $scope.allLocations.forEach(function(location) {
          location.detailsUrl = window.location.origin + '/' + $rootScope.city + '/locations/' + location.id;
          location.showComments = false;
        });

        $scope.loadMore();
        resetSummaries();
        reloadMap();
        $scope.loading = false;
      });

      $scope.toogleView = function() {
        $scope.isMapView = !$scope.isMapView;
        $scope.isListView = !$scope.isListView;
        reloadMap();
      }

      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      }

      window.scrollTo(0, 0);
    }
  ]);
