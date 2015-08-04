'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService) {


      $scope.location = {};
      $rootScope.$watch("user.ratings", function(newValue, oldValue) {
        if (newValue) {
          resetGeneratedRatings();
        }
      });
      var resetGeneratedRatings = function() {
          $scope.location.summaries = ratingService.generateRatings($scope.location);
      }

      Location.get({
        locationId: $routeParams.locationId
      }, function(location) {

        maps.init(location, 14);
        maps.addLocation(location);

        $scope.location = location;
        resetGeneratedRatings();
      });

      window.scrollTo(0, 0);
    }
  ]);
