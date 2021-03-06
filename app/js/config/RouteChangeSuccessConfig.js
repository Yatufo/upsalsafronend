var eventify = eventify;

var routeChangeSuccess = function($rootScope, userService, util) {


  $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

    if (current.params.city) {
      $rootScope.city = current.params.city.toProperCase();
      var site = {
        name: "Up Salsa in " + $rootScope.city + " : Best places to dance Salsa, Bachata, Kizomba, etc.",
        description: "Find the best places and events to learn or dance in " + $rootScope.city + "any latin music like salsa, bachata, chacha, kizomba, etc."
      };
      util.changeSEOtags(site, 'site');
    }

    reloadUser(!_.isEmpty($rootScope.user));
  });

  $rootScope.$on("authenticationChange", function(event, authenticated) {
    reloadUser(authenticated);
  });

  function reloadUser(shouldReset) {
    if (shouldReset) {
      userService.findCurrentUser().then(function(user) {
        $rootScope.user = user;
      });
    } else {
      $rootScope.user = {};
    }
  }
};

eventify.run(["$rootScope", "UserService", "UtilService", routeChangeSuccess]);
