'use strict';

var module = angular.module('myApp.events', ['ngRoute'])


module.controller('EventsCtrl', function($scope, $http) {
    $http.get('data/events.json').success(function(data) {
        $scope.events = data;
    });
});