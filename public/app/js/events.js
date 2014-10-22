'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', ['myApp.config']);

myAppControllers.controller('EventsCtrl', ['$scope', '$http', 'CONFIG',
    function($scope, $http, CONFIG) {
        $http.get(CONFIG.EVENTS_ENDPOINT).success(function(data) {
        	console.log(JSON.stringify(data));
            $scope.events = data;
        });

    }
]);


