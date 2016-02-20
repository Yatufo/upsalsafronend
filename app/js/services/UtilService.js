/* Service */
var UtilService = function($rootScope, $window, $location, cfg) {

  function getDetailsPath(item, type) {
    return $rootScope.city + '/' + type + 's/' + item.id;
  }

  function getDetailsUrl(item, type) {
    return $window.location.origin + '/' + getDetailsPath(item, type);
  }

  function getImageUrl(item, type) {
    //TODO: Remove window dependency.
    var imageSizePath = $(window).width() > cfg.HI_RES_WIDTH ? cfg.LO_RES_IMAGES : cfg.HI_RES_IMAGES;
    var imageUrl = cfg.DEAFULT_IMAGES[type];

    if (!_.isEmpty(item.images)) {
      imageUrl = _.sortByOrder(item.images, ['created'], ['desc'])[0].url
    }

    return $window.location.origin + '/' + imageSizePath + imageUrl;
  }

  var service = {
    getUrls: function(item, type) {
      return {
        detailsUrl: getDetailsUrl(item, type),
        imageUrl: getImageUrl(item, type)
      };
    },
    changeSEOtags: function(item, type) {
      $rootScope.seo.url = getDetailsUrl(item, type);
      $rootScope.seo.image = getImageUrl(item, type);
      $rootScope.seo.description = item.description;
      $rootScope.seo.title = item.name;
    },
    getDetailsPath: getDetailsPath,
    isUserOwned: function(object) {
      if (!object) return false;

      var user = $rootScope.user || {};
      var isAdmin = _.includes(user.roles, "ADMIN");
      var isOwner = _.isEqual(object.createdBy, user._id);

      return isOwner || isAdmin
    }
  };

  return service;
};

eventify
  .factory('UtilService', ['$rootScope', '$window', '$location', 'CONFIG', UtilService]);
