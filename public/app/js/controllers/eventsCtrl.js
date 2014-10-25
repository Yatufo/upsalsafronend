'use strict';

/* Controllers */

var myAppControllers = angular.module('myAppControllers', ['myAppConfig']);

myAppControllers.controller('EventsCtrl', ['$scope', '$http', 'CONFIG',
    function($scope, $http, CONFIG) {

        $scope.localTime = new Date(CONFIG.TODAY);
        $scope.daysRange = CONFIG.DEFAULT_HAPPENSON;

        console.log($scope.localTime);
        $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
            console.log(JSON.stringify(data));
            $scope.events = data;
        });
    }
]);

