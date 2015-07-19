'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('LocationsController', ['$scope', 'Location', 'MapsService', 'RatingService',
        function($scope, Location, MapsService, ratingService) {


            $scope.locations = [];

            Location.query({}, function(locations) {
                $scope.locations = locations;

                MapsService.init();
                $scope.locations.forEach(function(location) {
                    MapsService.addLocation(location);
                    location.ratings = ratingService.generateRatings(location);
                });
            });

            $scope.highlightLocation = function(location) {
                MapsService.highlightLocation(location);
            }

            window.scrollTo(0, 0);
        }
    ]);
