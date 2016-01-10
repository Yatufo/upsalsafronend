'use strict';

var AutocompleteDirectiveController = function($log, $window, $q) {
  var GEOCODE = 'geocode';

  return {
    restrict: 'A',
    require: '?ngModel',
    scope : {
      inputid:'@id',
      completed:'&'
    },

    link : function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) { return; }

       var placeSearch, autocomplete;

       scope.inputid = scope.inputid ? scope.inputid : 'autocomplete';

      function init() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        var input = document.getElementById(scope.inputid);
        autocomplete = new google.maps.places.Autocomplete(input);

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', onPlaceChanged);
      }

      function onPlaceChanged() {
        console.log(autocomplete.getPlace());
      }

      init();
    }

  };
};

eventify.directive('autocomplete', ['$log', '$window', '$q', AutocompleteDirectiveController]);
