

/* Service */
var UtilService = function ($rootScope, $window, $location) {
    function getDetailsPath(item, type) {
      return $rootScope.city + '/'+ type +'s/' + item.id;
    }
    var service = {
        getDetailsUrl: function(item, type) {
          return $window.location.origin + '/' + getDetailsPath(item, type);
        },
        getDetailsPath : getDetailsPath
    };

    return service;
};

eventify
    .factory('UtilService', ['$rootScope', '$window', '$location', UtilService]);
