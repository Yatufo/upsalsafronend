

/* Service */

var CategoryService = function($rootScope) {

  var cfg = $rootScope.CONFIG;
  
  //only categories after third level.
  var hashtags = _.compact(_.values($rootScope.categories)
    .map(function(category) {
      if (category.parent && !_.contains(cfg.HIDDEN_CATEGORIES, category.parent)) {
        return cfg.HASHTAG + category.id;
      }
    }));


  var service = {
    //TODO: get hashtags from the server or in a smarter way
    getHashTags: function(partial) {
      return hashtags
    }
  };

  return service;

};
eventify
  .factory('CategoryService', ['$rootScope', CategoryService]);
