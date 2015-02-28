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
myApp.config(['$compileProvider','$locationProvider', function($compileProvider, $locationProvider) {
    $compileProvider.debugInfoEnabled(false); //Performance
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);




myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/:city/categories/:eventType/events/', {
            templateUrl: 'views/events.html',
            controller: 'EventsController'
        }).
        when('/:city/events/:eventId', {
            templateUrl: 'views/events-details.html',
            controller: 'EventDetailsController'
        }).
        when('/:city/locations', {
            templateUrl: 'views/locations.html',
            controller: 'LocationsController'
        }).
        when('/:city/locations/:locationId', {
            templateUrl: 'views/locations-details.html',
            controller: 'LocationDetailsController'
        }).
        when('/:city', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/montreal'
        });
    }
]);
