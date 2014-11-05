'use strict';

/* App Module */

var myApp = angular.module('myApp', [
    'ngRoute',
    'myAppControllers',
    'myAppFilters',
    'myAppConfig',
    'ui.bootstrap'
]);

angular.module('myAppControllers', ['myAppConfig']);
angular.module('myAppFilters', ['myAppConfig']);



myApp.directive('categorySelector', function() {
        return {
            restrict: 'E',
            scope: {
                node: '='
            },
            templateUrl: 'views/components/categories-selector.html'
        };
    });

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


