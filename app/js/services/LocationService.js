

/* Service */

var LocationService = function($rootScope, $q, Location) {

  var service = {
    saveOrUpdate: function(location) {
      return $q(function(resolve, reject) {
        var resource = new Location(location);

        if (!resource.id) {
          resource.$save(function(saved) {
            resolve(saved);
          }, reject);
        } else {
          Location.update(resource, resolve, reject);
        }
      });
    }
  };

  return service;

};
eventify
  .factory('LocationService', ['$rootScope', '$q', 'Location', LocationService]);
