

/* Service */

var UserService = function($rootScope, $q, User) {


  var service = {

    findCurrentUser: function() {
      return $q(function(resolve, reject) {
        var profile = $rootScope.auth.profile;


        User.get({}, resolve, function() {
          var resource = new User({
            sync: {
              updated_at: profile.updated_at,
              created_at: profile.created_at
            },
            publicInfo: {
              picture: profile.picture,
              link: profile.link,
              nickname: profile.nickname
            }
          });

          resource.$save(resolve, reject);
        });

      });
    }
  };

  return service;

};
eventify
  .factory('UserService', ['$rootScope', '$q', 'UsersResource', UserService]);
