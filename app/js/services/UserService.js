

/* Service */

var UserService = function($rootScope, $q, User) {

  var service = {

    findCurrentUser: function() {
      return $q(function(resolve, reject) {
        var profile = $rootScope.auth.profile;
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

        resource.$save(function(saved) {
          resource.id = saved.id;
          resolve(resource);
        }, reject);

      });
    }
  };

  return service;

};
angular.module('eventifyServices')
  .factory('UserService', ['$rootScope', '$q', 'UsersResource', UserService]);
