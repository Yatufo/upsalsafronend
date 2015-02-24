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
        when('/:city/categories/:eventType/events/', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).
        when('/:city/events/:eventId', {
            templateUrl: 'views/events-details.html',
            controller: 'EventsDetailsCtrl'
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


var $sidebar = $("#map-canvas"),
    $window = $(window),
    offset = $sidebar.offset(),
    topPadding = 15;
$window.scroll(function() {
    if ($window.scrollTop() > offset.top) {
        $sidebar.addClass('fixed');
    } else {
        $sidebar.removeClass('fixed');
    }
});