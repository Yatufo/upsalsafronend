

/* Service */

angular.module('eventifyResources').factory('RatingResource', ['$resource', function($resource) {
  return $resource('/api/ratings/:ratingId', {
    'ratingId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
