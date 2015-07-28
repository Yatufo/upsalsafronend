'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationsController', ['$scope', '$rootScope', 'Location', 'MapsService', 'RatingService',
    function($scope, $rootScope, Location, MapsService, ratingService) {


      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetGeneratedRatings();
        }
      });

      $scope.locations = [];
      var resetGeneratedRatings = function() {
        $scope.locations.forEach(function(location) {
          MapsService.addLocation(location);
          location.summaries = ratingService.generateRatings(location);
        });
      }

      Location.query({}, function(locations) {
        $scope.locations = locations;

        MapsService.init();
        resetGeneratedRatings();
      });

      $scope.highlightLocation = function(location) {
        MapsService.highlightLocation(location);
      }

      window.scrollTo(0, 0);
    }
  ]);
