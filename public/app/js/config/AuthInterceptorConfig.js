

var eventify = angular.module('eventify');

var AuthInterceptor = function($q, $location, security) {
  return {
    responseError: function(response) {
      if (response && response.status === 401) {
        security.signin()
      }
      return $q.reject(response);
    }
  };
};

eventify.factory('AuthInterceptor', ["$q", "$location", "SecurityService", AuthInterceptor]);


eventify.config(["$httpProvider", function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);
