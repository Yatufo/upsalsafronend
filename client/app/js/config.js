var config_module = angular.module('myApp.config', [])
    .constant('CONFIG', {
        'APP_NAME': 'Mulatti',
        'APP_VERSION': '0.1',
        'EVENTS_ENDPOINT': 'http://localhost:3000/events'
    });