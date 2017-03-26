module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'app/dependencies/angular/angular.min.js',
            'app/dependencies/jquery/dist/jquery.min.js',
            'app/assets/js/dependencies.min.js',
            'app/assets/js/eventify.js',
            'tests/**/*.js'
        ],
        exclude: [],
        plugins: [
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
        ],
        preprocessors: {},
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 10000, //Increase when debugging
        singleRun: true
    });
};
