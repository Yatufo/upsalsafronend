'use strict';

/* Controllers */

angular.module('eventifyControllers')
  .controller('LocationDetailsController', ['$rootScope', '$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
    function($rootScope, $scope, $http, $routeParams, CONFIG, MapsService) {

      // would get the next category the user would rate
      $scope.getUnratedCategories = function(location) {
        return [$rootScope.categories['class'], $rootScope.categories['party']];
      }

      $scope.location = {};

      $http.get(CONFIG.LOCATIONS_ENDPOINT + '/' + $routeParams.locationId).
      success(function(data, status, headers, config) {
        $scope.location = data;

        if ($scope.location) {
          MapsService.init($scope.location, 14);
          MapsService.addLocation($scope.location);

          if (!$scope.location.ratings)
            $scope.location.ratings = [];

          $scope.getUnratedCategories().forEach(function(category) {
            $scope.location.ratings.push({
              category: category,
              location: location
            });
          })

        }

      })



      window.scrollTo(0, 0);
    }
  ]);
