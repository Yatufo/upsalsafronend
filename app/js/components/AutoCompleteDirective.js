'use strict';

var AutocompleteDirectiveController = function($log, $window, $q) {
  var GEOCODE = 'geocode';

  return {
    restrict: 'A',
    require: '?ngModel',
    scope: {
      inputid: '@id',
      completed: '&',
      location: '='
    },
    link: function(scope, element, attrs, ngModelCtrl) {
      if (!ngModelCtrl) {
        return;
      }

      scope.inputid = scope.inputid ? scope.inputid : 'autocomplete';

      function init() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        var input = document.getElementById(scope.inputid);
        scope.autocomplete = new google.maps.places.Autocomplete(input);

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        scope.autocomplete.addListener('place_changed', onPlaceChanged);
      }

      function onPlaceChanged() {
        var place = scope.autocomplete.getPlace();

        scope.location.address = place.formatted_address;
        scope.location.coordinates = {
          longitude: place.geometry.location.lng(),
          latitude: place.geometry.location.lat()
        };
      }

      init();
    }

  };
};

eventify.directive('autocomplete', ['$log', '$window', '$q', AutocompleteDirectiveController]);
