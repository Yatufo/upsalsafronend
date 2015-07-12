'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationDetailsController', ['$rootScope', '$scope', 'Location', '$routeParams', 'CONFIG', 'MapsService',
    function($rootScope, $scope, Location, $routeParams, CONFIG, MapsService) {

      // would get the next category the user would rate
      $scope.getRateableCategories = function(location) {
        return [$rootScope.categories['class'], $rootScope.categories['party']];
      }

      $scope.location = {};

      Location.get({
        locationId: $routeParams.locationId
      }, function(location) {

        if (location) {
          MapsService.init(location, 14);
          MapsService.addLocation(location);

          location.ratings = location.ratings || [];
          var ratedCategories = [];

          location.ratings.forEach(function(rating) {
            rating.category = $rootScope.categories[rating.category];
            rating.location = location;
            ratedCategories.push(rating.category);
          });

          $scope.getRateableCategories().forEach(function(category) {
            if (!_.contains(ratedCategories, category)) {
              location.ratings.push({
                category: category,
                location: location
              });
            }
          });

          $scope.location = location;
        }

      })



      window.scrollTo(0, 0);
    }
  ]);
