'use strict';

/* App Module */

var myApp = angular.module('myApp', [
    'ngRoute',
    'myAppControllers',
    'myAppFilters',
    'myAppConfig',
    'myAppServices'
]);

angular.module('myAppControllers', ['myAppConfig', 'myAppServices']);
angular.module('myAppFilters', ['myAppConfig']);
angular.module('myAppServices', ['myAppConfig']);

//Production configuration
myApp.config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false); //Performance
}]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/:city/events/:category', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).
        when('/:city', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        }).
        otherwise({
            redirectTo: '/montreal'
        });
    }
]);
