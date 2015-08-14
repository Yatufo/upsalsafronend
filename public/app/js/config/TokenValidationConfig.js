

var eventify = angular.module('eventify');

var TokenValidation = function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.auth = auth;

  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token && !jwtHelper.isTokenExpired(token)) {
      if (!auth.isAuthenticated) {
        auth.authenticate(store.get('profile'), token);
        $rootScope.$emit("authenticationChange", true);
      }
    }
  });
}

eventify.run(["$rootScope", "auth", "store", "jwtHelper", "$location", TokenValidation]);
