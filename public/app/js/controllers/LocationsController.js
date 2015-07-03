'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('LocationsController', ['$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
        function($scope, $http, $routeParams, CONFIG, MapsService) {


            $scope.locations = [];

            $http.get(CONFIG.LOCATIONS_ENDPOINT).
            success(function(data, status, headers, config) {
                $scope.locations = data;


                if ($scope.locations) {
                    MapsService.init();
                    $scope.locations.forEach(function(location) {
                        MapsService.addLocation(location);
                    });
                }
            }).
            error(function(data, status, headers, config) {
                console.log("Something went wrong with the locations");
            });

            $scope.highlightLocation = function(location) {
                MapsService.highlightLocation(location);
            }

            window.scrollTo(0, 0);
        }
    ]);
