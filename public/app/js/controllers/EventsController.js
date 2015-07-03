'use strict';

/* Controllers */

angular.module('eventifyControllers')
    .controller('EventsController', ['$scope', '$http', '$filter', '$routeParams', 'CONFIG', 'diffusionService', 'MapsService',
        function($scope, $http, $filter, $routeParams, CONFIG, diffusionService, MapsService) {

            $scope.localTime = CONFIG.TODAY;
            $scope.selectedCategories = {};
            $scope.events = [];
            $scope.loading = true;

            //TODO: replace this with a proper configuration depending on the environment.
            if ($routeParams.testDate) {
                $scope.localTime = new Date($routeParams.testDate);
            }


            diffusionService.onChangeCategories($scope, function(message) {
                $scope.selectedCategories = message.selected;
                $scope.loading = true;
                filterEvents();
            });

            var filterEvents = function() {
                searchEvents(getSelecteCategoryValues(), null, function(results) {
                    $scope.events = results.events;
                    showEventsInMap($scope.events);
                    diffusionService.changeEvents(results.eventsCategories);
                })
            };

            var searchEvents = function(categories, location, callback) {
                var config = {
                    params: {
                        "categories": categories.join(",")
                    }
                }

                $http.get(CONFIG.EVENTS_ENDPOINT, config).success(function(data) {
                    callback(data);
                    $scope.loading = false;
                });

            }

            var getSelecteCategoryValues = function() {
                var categories = [];
                for (var key in $scope.selectedCategories) {
                    if ($scope.selectedCategories[key]) {
                        categories.push($scope.selectedCategories[key]);
                    }
                }
                return categories;
            }


            var showEventsInMap = function(events) {
                MapsService.reset();
                if (angular.isArray(events)) {
                    events.forEach(function(lEvent) {
                        MapsService.addLocation(lEvent.location);
                    });
                }
            }

            $scope.highlightLocation = function(location) {
                MapsService.highlightLocation(location);
            }


            MapsService.init();
        }


    ]);
