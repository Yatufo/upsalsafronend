

/* Service */

eventify.factory('EventsResource', ['$resource', function($resource) {
  return $resource('/api/events/:eventId', {
    'eventId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
