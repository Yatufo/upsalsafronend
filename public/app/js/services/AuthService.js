'use strict';

/* Service */

angular.module('eventifyServices')
  .factory('AuthService', ['$rootScope', AuthService]);

function AuthService($rootScope) {
  var service = {
    valid: function() {
      if (!$rootScope.user.authenticated) {
        $("#auth-modal").modal('show');
      }
      return $rootScope.user.authenticated;
  }};

  return service;
}
