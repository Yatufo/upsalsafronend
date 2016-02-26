'use strict';

eventify.directive('placeholder', ['gettextCatalog', function(i18n){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      var translatedPlaceholder = i18n.getString(attrs.placeholder);
      element.attr('placeholder', translatedPlaceholder);
    }
  };
}]);
