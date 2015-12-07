

/* Service */

var EventService = function($rootScope, $q, Event) {

  var service = {
    saveOrUpdate: function(event) {
      return $q(function(resolve, reject) {
        var resource = new Event(event);

        if (!resource.id) {
          resource.$save(function(saved) {
            resolve(saved);
          }, reject);
        } else {
          Event.update(resource, resolve, reject);
        }
      });
    }
  };

  return service;

};
eventify
  .factory('EventService', ['$rootScope', '$q', 'EventsResource', EventService]);
