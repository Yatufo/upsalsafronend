var EditableEventCardController = function($scope, $rootScope, service, CONFIG, util) {

    var HASHTAG = '#';

    //only categories after third level.
    var hashtags = _.compact(_.values($rootScope.categories)
    .map(function(category) {
      if (category.parent && !_.contains(CONFIG.HIDDEN_CATEGORIES, category.parent)){
        return HASHTAG + category.id;
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

    function toLocation(location) {
      return _.pick(location, 'id', 'name', 'address', 'url', 'phone', 'coordinates')
    }

    function init(argument) {
      var start = moment().startOf('hour').add(1, 'hours');


      $scope.event = {
        location: toLocation($scope.location),
        description: "",
        categories: ['party'], //TODO Get the categories as hashtags from the desciption
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

      $scope.event.categories = $scope.event.description
        .match(CONFIG.EXTRACT_HASHTAG_REGEX)
        .map(function (hashtag) {
          return hashtag.replace(HASHTAG, '');
        });

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
      return moment($scope.event.end.dateTime).diff($scope.event.start.dateTime, 'hours');
    }

    init();
  }
  /* App Module */

eventify.directive('editableeventcard', function() {
  return {
    restrict: 'E',
    scope: {
      location: '=',
      onCancel: '&',
      onSave: '&',
    },
    controller: ['$scope', '$rootScope', 'EventService', 'CONFIG', 'UtilService', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
