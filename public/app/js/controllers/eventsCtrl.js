'use strict';

/* Controllers */

var myAppControllers = angular.module('myAppControllers', ['myAppConfig']);

myAppControllers.controller('EventsCtrl', ['$scope', '$http', 'CONFIG',
    function($scope, $http, CONFIG) {

        $scope.localTime = CONFIG.TODAY;
        $scope.daysRange = CONFIG.DEFAULT_HAPPENSON;
        $scope.selectedCategory = [];

        $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
            $scope.events = data;
        });

        $http.get(CONFIG.CATEGORIES_ENDPOINT).success(function(data) {
            $scope.categories = data;
            for (var i = 0; i < data.length; i++) {
                $scope.selectedCategory[data[i].id] = data[i].categories[0].id;
            }
        });

    }
]);