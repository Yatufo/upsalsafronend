

/* Service */

eventify.factory('RatingResource', ['$resource', function($resource) {
  return $resource('/api/ratings/:ratingId', {
    'ratingId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
