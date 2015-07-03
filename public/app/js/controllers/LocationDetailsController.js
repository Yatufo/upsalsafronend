'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('LocationDetailsController', ['$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
        function($scope, $http, $routeParams, CONFIG, MapsService) {


            $scope.location = {};

            $http.get(CONFIG.LOCATIONS_ENDPOINT + '/' + $routeParams.locationId).
            success(function(data, status, headers, config) {
                $scope.location = data;

                if ($scope.location) {
                    MapsService.init($scope.location, 14);
                    MapsService.addLocation($scope.location);
                }
            }).
            error(function(data, status, headers, config) {
                console.log("Something went wrong");
            });

            window.scrollTo(0, 0);
        }
    ]);
