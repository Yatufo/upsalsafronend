

/* Service */
var SecurityService = function (auth, store, $rootScope, $location) {

    var service = {
        signin: function() {
          auth.signin({}, function(profile, token) {
            store.set('token', token);
            store.set('profile', profile);
            auth.authenticate(profile, token);
            $rootScope.$emit("authenticationChange", true);
          }, function(e) {
            console.warn(e);
          });
        },
        logout : function () {
          auth.signout();
          store.remove('profile');
          store.remove('token');
          $location.path('/');
          $rootScope.$emit("authenticationChange", false);
        },
        getToken : function () {
          return store.get('token');
        }
    };

    return service;
};

eventify
    .factory('SecurityService', ["auth", "store", '$rootScope', '$location', SecurityService]);
