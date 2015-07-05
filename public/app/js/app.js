'use strict';

/* App Module */

var eventify = angular.module('eventify', [
    'ngRoute',
    'ngResource',
    'eventifyControllers',
    'eventifyFilters',
    'eventifyConfig',
    'eventifyServices',
    'eventifyResources'
]);

angular.module('eventifyControllers', ['eventifyConfig', 'eventifyServices']);
angular.module('eventifyFilters', ['eventifyConfig']);
angular.module('eventifyServices', ['eventifyConfig']);
angular.module('eventifyResources', ['ngResource']);

//Production configuration
eventify.config(['$compileProvider', '$locationProvider', function($compileProvider, $locationProvider) {
    $compileProvider.debugInfoEnabled(false); //Performance
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp):/);

}]);


eventify.config(['$routeProvider',
    function($routeProvider) {
        var routeResolver = {
            city: function() {
                return "montreal";
            }
        }

        $routeProvider.
        when('/:city/categories/:categories*\/events/', {
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
            controller: 'HomeController',
            resolve: routeResolver
        }).otherwise({
            redirectTo: '/montreal/locations'
        });
    }
]);
