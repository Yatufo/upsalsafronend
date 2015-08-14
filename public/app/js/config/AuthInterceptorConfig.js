

var eventify = angular.module('eventify');

var AuthInterceptor = function($q, $location, auth, store, $rootScope) {
  return {
    responseError: function(response) {
      if (response && response.status === 401) {
        auth.signin({}, function(profile, token) {
          store.set('token', token);
          store.set('profile', profile);
          auth.authenticate(profile, token);
          $rootScope.$emit("authenticationChange", true);
        }, function(e) {
          throw e;
        });
      }
      return $q.reject(response);
    }
  };
};

eventify.factory('AuthInterceptor', ["$q", "$location", "auth", "store", '$rootScope', AuthInterceptor]);


eventify.config(["$httpProvider", function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);
