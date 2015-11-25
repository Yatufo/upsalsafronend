var EditableEventCardController = function($scope, CONFIG) {



    $scope.event = {
      "_id": "54fc8442aacad0030040ca8b",
      "title": "Club /practice nights / Soirée de pratique 9pm-3am",
      "location": {
        "_id": {
          "$oid": "55c15d88a42c1f83f204e006"
        },
        "id": "salsaxtaze",
        "name": "Salsa Xtaze",
        "address": "5425, rue de Bordeaux,Loft 255,Montréal QC H2H 2P9 ",
        "url": "http://www.salsaxtaze.ca/",
        "phone": "5148913612",
        "ratings": [],
        "coordinates": {
          "latitude": 45.539399,
          "longitude": -73.582811
        },
        "__v": 0
      },
      "sequence": 1,
      "categories": [
        "kizomba",
        "bachata",
        "salsa",
        "chacha",
        "party",
        "intermediate"
      ],
      "end": {
        "dateTime": "2014-06-15T07:00:00.000Z"
      },
      "start": {
        "dateTime": "2014-06-15T01:00:00.000Z"
      }
    };

    $scope.event = {
      imageUrl: CONFIG.EVENT_DEFAULT_IMAGE,
      interval: {
        start: moment(),
        end: moment()
      }
    }
  }
  /* App Module */

angular.module('eventify').directive('editableeventcard', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      event: '=',
      city: '='
    },
    controller: ['$scope', 'CONFIG', EditableEventCardController],
    templateUrl: 'views/components/editable-event-card.html'
  };
});
