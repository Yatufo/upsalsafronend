'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.events'
])


myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/events', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
    }).
    otherwise({
        redirectTo: '/events'
    });
}]);