'use strict';

/* Controllers */

angular.module('myAppControllers')
    .controller('EventsCtrl', ['$scope', '$http', '$filter', '$routeParams',  'CONFIG', 'diffusionService',
        function($scope, $http, $filter, $routeParams, CONFIG, diffusionService) {

            $scope.localTime = CONFIG.TODAY;
            $scope.daysRange = CONFIG.DEFAULT_HAPPENSON;

            $scope.eventsCategories = new Set();
            $scope.filteredEvents = [];


            $scope.$watch('eventsCategories.content', function() {
                diffusionService.changeEvents($scope.eventsCategories.asArray());
            }, true);

            $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
                $scope.events = data;
                $scope.filteredEvents = data;

                populateEventsCategories();
            });


            diffusionService.onChangeCategories($scope, function(message) {
                // happensOn:selectedCategories['happenson']:localTime | categories:selectedCategories 
                $scope.filteredEvents = $filter('happensOn')($scope.events, message.selected['happenson'], $scope.localTime);
                $scope.filteredEvents = $filter('categories')($scope.filteredEvents, message.selected);

                populateEventsCategories();
            });

            var populateEventsCategories = function() {
                $scope.eventsCategories.content = {};
                for (var i = $scope.filteredEvents.length - 1; i >= 0; i--) {
                    var categories = $scope.filteredEvents[i].categories;
                    if (angular.isArray(categories)) {
                        for (var j = categories.length - 1; j >= 0; j--) {
                            $scope.eventsCategories.add(categories[j]);
                        }
                    }
                };
            };


            function Set() {
                this.content = {};
            }
            Set.prototype.content = function() {
                return this.content;
            }
            Set.prototype.add = function(val) {
                this.content[val] = true;
            }
            Set.prototype.remove = function(val) {
                delete this.content[val];
            }
            Set.prototype.contains = function(val) {
                return (val in this.content);
            }
            Set.prototype.asArray = function() {
                var res = [];
                for (var val in this.content) res.push(val);
                return res;
            }
        }


    ]);