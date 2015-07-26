'use strict';

var eventify = angular.module('eventify');

var routeChangeSuccess = function($rootScope, User) {


  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

    if (current.params.city) {
      $rootScope.city = current.params.city.toProperCase();
      $rootScope.seo = {
        title: "Up Salsa in " + $rootScope.city + " : Best places to dance Salsa, Bachata, Kizomba, etc.",
        metaDescription: "Find the best places and events to learn or dance in " + $rootScope.city + "any latin music like salsa, bachata, chacha, kizomba, etc."
      }
    }

    if ($rootScope.auth.isAuthenticated) {
      User.get({}, function(user) {
        $rootScope.user = user;
      })
    }

  });

}

eventify.run(["$rootScope", "UsersResource", routeChangeSuccess]);
