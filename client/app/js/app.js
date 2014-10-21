'use strict';

/* App Module */

var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.controllers'
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/events', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).
        otherwise({
            redirectTo: '/events'
        });
    }
]);