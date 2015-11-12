

/* Service */

angular.module('eventifyResources').factory('UsersResource', ['$resource', function($resource) {
  return $resource('/api/users/me', {}, {});
}]);
