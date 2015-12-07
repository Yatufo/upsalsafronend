

/* Service */

eventify.factory('CommentResource', ['$resource', function($resource) {
  return $resource('/api/comments/:ratingId', {
    'ratingId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
