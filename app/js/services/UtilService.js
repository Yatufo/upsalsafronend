/* Service */
var UtilService = function($rootScope, $window, $location, cfg) {

  function getDetailsPath(item, type) {
    return $rootScope.city + '/' + type + 's/' + item.id;
  }

  function getDetailsUrl(item, type) {
    return $window.location.origin + '/' + getDetailsPath(item, type);
  }

  function getImageInfo(item, type) {
    //TODO: Remove window dependency.
    var resolution = $(window).width() > cfg.HI_RES_WIDTH ? cfg.IMAGE_RESOLUTIONS.low : cfg.IMAGE_RESOLUTIONS.high;
    var imageSizePath = 'images/w' + resolution.width + '-h' + resolution.height + '-cscale/images/';
    var imageUrl = cfg.DEAFULT_IMAGES[type];

    if (!_.isEmpty(item.images)) {
      imageUrl = _.sortByOrder(item.images, ['created'], ['desc'])[0].url
    }
    var url = { url : $window.location.origin + '/' + imageSizePath + imageUrl} ;

    return _.extend(resolution , url);
  }

  var service = {
    getUrls: function(item, type) {
      return {
        detailsUrl: getDetailsUrl(item, type),
        imageUrl: getImageInfo(item, type).url
      };
    },
    changeSEOtags: function(item, type) {
      $rootScope.seo.url = getDetailsUrl(item, type);
      $rootScope.seo.image = getImageInfo(item, type);
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
