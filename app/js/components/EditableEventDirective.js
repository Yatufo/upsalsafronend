var EditableEventCardController = function($scope, $rootScope, service, categoryService, CONFIG, util) {

  $scope.smartarea = {
    description: {
      autocomplete: []
    }
  };

  categoryService.getCategories().then(function(categories) {
    $scope.smartarea.description.autocomplete = [{
      words: categoryService.getHashTags(categories),
      cssClass: 'hashtags'
    }]
  });

  $scope.selections = {
    repeat: false,
    count: 6,
    dows: {}
  }

  var dowIds = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
  var i = 0;
  $scope.allDows = dowIds.map(function(id) {
    return {
      id: id,
      name: moment.weekdays(i++)
    };
  });

  $scope.$watch("[selections.repeat, selections.count]", function() {
    resetRecurrenceRule();
  });
  $scope.$watchCollection("selections.dows", function() {
    resetRecurrenceRule();
  });

  function resetRecurrenceRule() {
    if ($scope.selections.repeat) {
      var selectedDows = _.compact(dowIds.map(function(id) {
        if ($scope.selections.dows[id]) {
          return id;
        }
      }));
      var rule = new RRule({
        freq: RRule.WEEKLY,
        count: $scope.selections.count,
        byweekday: selectedDows,
        dtstart: $scope.event.start.dateTime
      })

      $scope.selections.ruleText = rule.toText();
      $scope.event.recurrence = {
        rule: rule.toString()
      }

    } else {
      $scope.selections.ruleText = "";
      $scope.event.recurrence = {};
    }
  }



  function toLocation(location) {
    return _.pick(location, 'id', 'name', 'address', 'url', 'phone', 'coordinates')
  }

  function init() {
    if ($scope.event) return;

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
      resetRecurrenceRule();
      $scope.event.end = {
        dateTime: new moment(newVal).add(1, 'hours').toDate()
      };
    }
  });

  $scope.canSave = function() {
    $scope.event.categories = categoryService.extractCategories($scope.event.description);
    var validDates = $scope.event.end.dateTime > $scope.event.start.dateTime;

    return $scope.eventForm.$valid && !_.isEmpty($scope.event.categories) && validDates;
  };


  $scope.save = function() {
    if ($scope.canSave()) {
      service.saveOrUpdate($scope.event)
        .then(function(saved) {
          saved.detailsUrl = util.getDetailsUrl(saved, "event");
          $scope.$emit('eventCreated', saved);
        });
    } else {
      console.debug($scope.eventForm);
    }
  }

  $scope.cancel = function() {
    $scope.$emit('eventCancelled');
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
      options: '=',
      onCancel: '&',
      onSave: '&'
    },
    controller: ['$scope', '$rootScope', 'EventService', 'CategoryService', 'CONFIG', 'UtilService', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
