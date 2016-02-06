

var eventify = eventify;

eventify.config(['$routeProvider',
  function($routeProvider) {
    var routeResolver = {
      city: function() {
        return "montreal";
      }
    };

    $routeProvider.
    when('/privacy', {
      templateUrl: 'views/privacy.html'
    }).
    when('/terms', {
      templateUrl: 'views/terms.html'
    }).
    when('/test', {
      templateUrl: 'views/test.html'
    }).
    when('/:city/categories/:categories/events/', {
      templateUrl: 'views/events.html',
      controller: 'EventsController'
    }).
    when('/:city/events/:eventId', {
      templateUrl: 'views/events-details.html',
      controller: 'EventDetailsController'
    }).
    when('/:city/events/:eventId/edit', {
      templateUrl: 'views/events-edit.html',
      controller: 'EventEditController'
    }).
    when('/:city/locations/create', {
      templateUrl: 'views/locations-create.html',
      controller: 'LocationsCreateController'
    }).
    when('/:city/locations/:locationId/edit', {
      templateUrl: 'views/locations-edit.html',
      controller: 'LocationsEditController'
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
