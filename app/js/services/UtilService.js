

/* Service */
var UtilService = function ($rootScope, $window, $location) {

    var service = {
        getDetailsUrl: function(item, type) {
          return $window.location.origin + '/' + $rootScope.city + '/'+ type +'s/' + item.id;
        }
    };

    return service;
};

eventify
    .factory('UtilService', ['$rootScope', '$window', '$location', UtilService]);
