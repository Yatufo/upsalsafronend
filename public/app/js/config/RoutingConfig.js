'use strict';

var eventify = angular.module('eventify');

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
      controller: 'LocationsController',
      public: true
    }).
    when('/:city/locations/:locationId', {
      templateUrl: 'views/locations-details.html',
      controller: 'LocationDetailsController',
      public: true
    }).
    when('/:city', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      resolve: routeResolver,
      public: true
    }).
    otherwise({
      redirectTo: '/montreal/locations'
    });
  }
]);
