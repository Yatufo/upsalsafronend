

/* Service */

eventify.factory('EventsResource', ['$resource', function($resource) {
  return $resource('/api/events/:id', {}, {
    'update': {
      method: 'PUT'
    }
  });
}]);
