'use strict';

var eventify = angular.module('eventify');

var AuthInterceptor = function($q, $location, auth, store) {
  return {
    responseError: function(response) {
      if (response && response.status === 401) {
        auth.signin({}, function(profile, token) {
          store.set('profile', profile);
          store.set('token', token);
        }, function(e) {
          throw e;
        });
      }
      return $q.reject(response);
    }
  };
};

eventify.factory('AuthInterceptor', ["$q", "$location", "auth", "store", AuthInterceptor]);


eventify.config(["$httpProvider", function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);
