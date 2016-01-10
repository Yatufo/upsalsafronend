var EditableLocationCardController = function($scope, $rootScope, CONFIG, util) {

    //only categories after third level.
    var hashtags = _.compact(_.values($rootScope.categories)
    .map(function(category) {
      if (category.parent && !_.contains(CONFIG.HIDDEN_CATEGORIES, category.parent)){
        return CONFIG.HASHTAG + category.id;
      }
    }));

    $scope.options = {
      description: {
        autocomplete: [{
          words: hashtags,
          cssClass: 'hashtags'
        }]
      }
    }

    function init() {
      if($scope.location) return;

      $scope.location = {
        name : "name",
        description: "Demonio",
        categories: [],
        images: [],
        imageUrl: CONFIG.EVENT_DEFAULT_IMAGE,
      };
    };


    $scope.canSave = function() {

      $scope.location.categories = [];
      var hashtags = $scope.location.description.match(CONFIG.EXTRACT_HASHTAG_REGEX)

      if (hashtags) {
        var categories = [];
        hashtags.forEach(function (hashtag) {
          categories.push(hashtag.replace(CONFIG.HASHTAG, '').toLowerCase());
        });
        $scope.location.categories = _.uniq(categories);
      }

      return !(_.isEmpty($scope.location.categories) || _.isEmpty($scope.location.location.url));
    }

    $scope.save = function() {
      if ($scope.canSave()) {
        service.saveOrUpdate($scope.location)
          .then(function(saved) {
            saved.detailsUrl = util.getDetailsUrl(saved, "location");
            $scope.$emit('location', saved);
          });
      }
    }

    $scope.cancel = function() {
      $scope.$emit('location');
    }

    init();
  }


eventify.directive('editablelocationcard', function() {
  return {
    restrict: 'E',
    scope: {
      location: '=',
      onCancel: '&',
      onSave: '&',
    },
    controller: ['$scope', '$rootScope', 'CONFIG', 'UtilService', EditableLocationCardController],
    templateUrl: 'views/components/editable-location-card.html'
  };
});
