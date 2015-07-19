'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$routeParams', 'Location', 'MapsService', 'RatingService',
    function($rootScope, $scope, $routeParams, Location, maps, ratingService) {


      $scope.location = {};

      Location.get({
        locationId: $routeParams.locationId
      }, function(location) {

        maps.init(location, 14);
        maps.addLocation(location);

        location.ratings = ratingService.generateRatings(location);
        $scope.location = location;

      });

      window.scrollTo(0, 0);
    }
  ]);
