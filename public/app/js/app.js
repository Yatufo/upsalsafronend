'use strict';

/* App Module */

var myApp = angular.module('myApp', [
    'ngRoute',
    'myAppControllers',
    'myAppFilters',
    'myAppConfig'
]);

angular.module('myAppControllers', ['myAppConfig']);
angular.module('myAppFilters', ['myAppConfig']);

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


