'use strict';

/* Controllers */

angular.module('myAppControllers')
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

            window.scrollTo(0, 0);
        }
    ]);
