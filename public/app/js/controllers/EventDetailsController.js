'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventDetailsController', ['$scope', '$http', '$routeParams', 'CONFIG', 'MapsService',
        function($scope, $http, $routeParams, CONFIG, MapsService) {


            $scope.event = {};

            $http.get(CONFIG.EVENTS_ENDPOINT + '/' + $routeParams.eventId).
            success(function(data, status, headers, config) {
                $scope.event = data;

                if ($scope.event) {
                    MapsService.init($scope.event.location, 14);
                    MapsService.addLocation($scope.event.location);
                }
                
            }).
            error(function(data, status, headers, config) {
                console.log("Something went wrong");
            });

            window.scrollTo(0, 0);
        }
    ]);
