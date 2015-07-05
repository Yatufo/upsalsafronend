'use strict';

/* Service */

angular.module('eventifyResources').factory('Rating', ['$resource', function($resource) {
  return $resource('/api/ratings/:ratingId', {
    'ratingId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
