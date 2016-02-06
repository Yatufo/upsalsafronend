/* Service */

eventify.factory('Location', ['$resource', function($resource) {
  return $resource('/api/locations/:id', {
    'id' : '@_id'
  }, {
    'update': {
      method: 'PUT'
    },
    'getEvents' : {
      method: "GET",
      isArray: true,
      url: '/api/locations/:locationId/events?categories=:categories'
    }
  });
}]);
