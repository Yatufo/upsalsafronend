'use strict';

/* App Module */

angular.module('myApp').directive('sharesocial', function() {
    return {
        restrict: 'E',
        scope: {
            message: '=',
            url: '='
        },
        templateUrl: 'views/components/share-social.html'
    };
});
