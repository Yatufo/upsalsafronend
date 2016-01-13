/* Service */

var CategoryService = function($rootScope, Category, $q, cfg) {

  var service = {
    getCategories: function getCategories() {

      return $q(function(resolve, reject) {

        if ($rootScope.categories) {
          resolve($rootScope.categories)
        } else {

          Category.query({}, function(categories) {
            var results = {};
            categories.forEach(function(c) {
              results[c.id] = c;
            });

            $rootScope.categories = results;
            resolve($rootScope.categories)
          });
        }

      });

    },
    //TODO: get hashtags from the server or in a smarter way
    getHashTags: function getHashTags(categories) {

      //only categories after third level.
      var hashtags = _.compact(_.values(categories)
        .map(function(category) {
          if (category.parent && !_.contains(cfg.HIDDEN_CATEGORIES, category.parent)) {
            return cfg.HASHTAG + category.id;
          }
        }));

      return hashtags
    },
    extractCategories: function(text) {
      var categories = [];
      if (!text) return categories;

      var hashtags = text.match(cfg.EXTRACT_HASHTAG_REGEX)

      if (hashtags) {
        hashtags.forEach(function(hashtag) {
          categories.push(hashtag.replace(cfg.HASHTAG, '').toLowerCase());
        });
        categories = _.uniq(categories);
      }
      return categories;
    }
  };

  return service;

};
eventify
  .factory('CategoryService', ['$rootScope', 'Category', '$q', 'CONFIG', CategoryService]);
