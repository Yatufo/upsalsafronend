

/* Service */
var UtilService = function ($rootScope, $window, $location) {
    function getDetailsPath(item, type) {
      return $rootScope.city + '/'+ type +'s/' + item.id;
    }
    var service = {
        getDetailsUrl: function(item, type) {
          return $window.location.origin + '/' + getDetailsPath(item, type);
        },
        getDetailsPath : getDetailsPath,
        isUserOwned : function (object) {
          console.log("isUserOwned", object);
          if (! object) return false;

          var user = $rootScope.user || {};
          var isAdmin = _.includes(user.roles, "ADMIN");
          var isOwner =  _.isEqual(object.createdBy, user._id);
          console.log(user, isAdmin, isOwner);
          return  isOwner || isAdmin
        }
    };

    return service;
};

eventify
    .factory('UtilService', ['$rootScope', '$window', '$location', UtilService]);
