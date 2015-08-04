'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationsController', ['$scope', '$rootScope', '$window', 'Location', 'MapsService', 'RatingService',
    function($scope, $rootScope, $window, Location, maps, ratingService) {

      $scope.isMapView = maps.isMapVisible();
      $scope.isListView = true;
      $scope.canToggleView = !$scope.isMapView;
      $scope.isMapLoaded = false;

      function reloadMap(forceReload) {
        if ($scope.isMapView && (forceReload || !$scope.isMapLoaded)) {
          maps.init();
          $scope.locations.forEach(function(location) {
            maps.addLocation(location);
          });
          $scope.isMapLoaded = true;
        }
      };

      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetGeneratedRatings();
        }
      });

      $scope.locations = [];
      var resetGeneratedRatings = function() {
        $scope.locations.forEach(function(location) {
          location.summaries = ratingService.generateRatings(location);
        });
      }

      Location.query({}, function(locations) {
        $scope.locations = locations;
        resetGeneratedRatings();
        reloadMap();
      });

      $scope.toogleView = function() {
        $scope.isMapView = ! $scope.isMapView;
        $scope.isListView = ! $scope.isListView;
        reloadMap();
      }

      $scope.highlightLocation = function(location) {
        maps.highlightLocation(location);
      }

      window.scrollTo(0, 0);
    }
  ]);
