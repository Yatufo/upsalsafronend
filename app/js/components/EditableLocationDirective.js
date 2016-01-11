var EditableLocationCardController = function($scope, $rootScope, service, categoryService, CONFIG, util) {

  $scope.options = {
    description: {
      autocomplete: [{
        words: categoryService.getHashTags(),
        cssClass: 'hashtags'
      }]
    }
  }

  function init() {
    if ($scope.location) return;

    $scope.location = {
      description: "",
      categories: [],
      images: [],
      imageUrl: CONFIG.EVENT_DEFAULT_IMAGE,
    };
  };


  $scope.canSave = function() {

    $scope.location.categories = categoryService.extractCategories($scope.location.description);
    return $scope.locationForm.$valid && ! _.isEmpty($scope.location.categories);
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
    controller: ['$scope', '$rootScope', 'LocationService', 'CategoryService', 'CONFIG', 'UtilService', EditableLocationCardController],
    templateUrl: 'views/components/editable-location-card.html'
  };
});
