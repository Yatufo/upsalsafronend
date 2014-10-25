'use strict';

var config_module = angular.module('myApp.config', [])
    .constant('CONFIG', {
        'APP_NAME': 'Mulatti',
        'APP_VERSION': '0.1',
        'EVENTS_ENDPOINT': '/api/events',
        'TODAY': '2014-10-26T00:00:01-04:00',
        'DEFAULT_HAPPENSON': 'today'
    });