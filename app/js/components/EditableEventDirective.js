var EditableEventCardController = function($scope, $rootScope, service, categoryService, CONFIG, util) {

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
          words: categoryService.getHashTags(),
          cssClass: 'hashtags'
        }]
      }
    }

    function toLocation(location) {
      return _.pick(location, 'id', 'name', 'address', 'url', 'phone', 'coordinates')
    }

    function init() {
      if($scope.event) return;

      var start = moment().startOf('hour').add(1, 'hours');


      $scope.event = {
        location: toLocation($scope.location),
        description: "",
        categories: [],
        images: [],
        imageUrl: CONFIG.EVENT_DEFAULT_IMAGE,
        start: {
          dateTime: start.toDate()
        }
      };
    };

    $scope.$watch("event.start.dateTime", function(newVal) {
      if (newVal) {
        $scope.event.end = {
          dateTime: new moment(newVal).add(1, 'hours').toDate()
        };
      }
    })

    $scope.canSave = function() {

      $scope.event.categories = [];
      var hashtags = $scope.event.description.match(CONFIG.EXTRACT_HASHTAG_REGEX)

      if (hashtags) {
        var categories = [];
        hashtags.forEach(function (hashtag) {
          categories.push(hashtag.replace(CONFIG.HASHTAG, '').toLowerCase());
        });
        $scope.event.categories = _.uniq(categories);
      }

      return (!_.isEmpty($scope.event.categories) && $scope.event.end && $scope.event.end.dateTime > $scope.event.start.dateTime) &&
        !_.isEmpty($scope.event.location.url)
    }

    $scope.save = function() {
      if ($scope.canSave()) {
        service.saveOrUpdate($scope.event)
          .then(function(saved) {
            saved.detailsUrl = util.getDetailsUrl(saved, "event");
            $scope.$emit('event', saved);
          });
      }
    }

    $scope.cancel = function() {
      $scope.$emit('event');
    }

    $scope.getDuration = function() {
      return $scope.event.end ? moment($scope.event.end.dateTime).diff($scope.event.start.dateTime, 'hours') : 0;
    }

    init();
  }
  /* App Module */

eventify.directive('editableeventcard', function() {
  return {
    restrict: 'E',
    scope: {
      location: '=',
      event: '=',
      onCancel: '&',
      onSave: '&',
    },
    controller: ['$scope', '$rootScope', 'EventService', 'CategoryService', 'CONFIG', 'UtilService', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
