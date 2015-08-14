

/* Service */

angular.module('eventifyResources').factory('Location', ['$resource', function($resource) {
  return $resource('/api/locations/:locationId', {
    'locationId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
