

/* Service */

eventify.factory('UsersResource', ['$resource', function($resource) {
  return $resource('/api/users/me', {}, {});
}]);
