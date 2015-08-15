

var eventify = angular.module('eventify');

var routeChangeSuccess = function($rootScope, userService) {


  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

    if (current.params.city) {
      $rootScope.city = current.params.city.toProperCase();
      $rootScope.seo = {
        title: "Up Salsa in " + $rootScope.city + " : Best places to dance Salsa, Bachata, Kizomba, etc.",
        metaDescription: "Find the best places and events to learn or dance in " + $rootScope.city + "any latin music like salsa, bachata, chacha, kizomba, etc."
      };
    }
  });

  $rootScope.$on("authenticationChange", function(event, authenticated) {
    if (authenticated) {

      userService.findCurrentUser().then(function (user) {
        $rootScope.user = user;
      });

    } else {
      $rootScope.user = {};
    }
  });
};

eventify.run(["$rootScope", "UserService", routeChangeSuccess]);
