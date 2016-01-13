

/* Service */

eventify.factory('Category', ['$resource', function($resource) {
  return $resource('/api/categories/:categoryId', {
    'categoryId': '@id'
  }, {
    'update': {
      method: 'PUT'
    }
  });
}]);
