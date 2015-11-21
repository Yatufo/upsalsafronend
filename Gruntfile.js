module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  //
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var livereloadSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  var serveStatic = require('serve-static');
  var path = require('path');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // The actual grunt server settings
    connect: {
      options: {
        port: 5000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      //TODO: use default dev servers so as not to depend to a local enviroment.
      proxies: [{
        context: '/api',
        host: 'salsa.local',
        port: 3002
      },{
        context: '/images',
        host: 'salsa.local',
        port: 3001
      }],
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              proxySnippet,
              livereloadSnippet,
              serveStatic(path.resolve("app"), {'index': ['index-local.html']})
            ];
          }
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js'
      },
      html: {
        tasks: ['build'],
        files: ['app/js/**/*.js', 'app/**/*.html', 'app/assets/css/*.css'],
        options: {
          livereload: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        beautify: true,
        mangle: true
      },
      app: {
        src: ['app/js/**/*.js', 'app/assets/js/templates.js'],
        dest: 'app/assets/js/<%= pkg.name %>.min.js'
      },
      deps: {
        src: ['app/bower_components/**/angular-storage.min.js',
          'app/bower_components/**/angular-cookies.min.js',
          'app/bower_components/**/angular-jwt.min.js',
          'app/bower_components/**/angular-resource.min.js',
          'app/bower_components/**/angular-route.min.js',
          'app/bower_components/**/ng-file-upload-all.min.js',
          'app/bower_components/**/auth0-angular.min.js',
          'app/bower_components/**/auth0-lock.min.js',
          'app/bower_components/**/auth0.min.js',
          'app/bower_components/**/moment.min.js',
          'app/bower_components/**/ng-infinite-scroll.min.js',
          'app/bower_components/**/underscore-min.js'
        ],
        dest: 'app/assets/js/dependencies.min.js',
      }
    },
    wiredep: {
      target: {
        src: 'app/index-local.html' // point to your HTML file.
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      app: {
        src: ['app/js/**/*.js', 'app/assets/js/templates.js'],
        dest: 'app/assets/js/<%= pkg.name %>.js',
      },
      deps: {
        src: ['app/bower_components/**/angular-*.js',
          'app/bower_components/**/build/*.js',
          'app/bower_components/**/dist/*.js',
          '!**/*.min.js'
        ],
        dest: 'app/assets/js/dependencies.js',
      }
    },
    jshint: {
      beforeconcat: ['app/js/**/*.js'],
      afterconcat: ['app/assets/js/<%= pkg.name %>.js']
    },
    html2js: {
      options: {
        base: "app",
        module: "eventifyTemplates",
        singleModule: true
      },
      main: {
        src: ['app/views/**/*.html'],
        dest: 'app/assets/js/templates.js'
      }
    },
    aws_s3: {
      options: {
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: 'upsalsa.com'
        },
        files: [{
          expand: true,
          cwd: 'app/assets/',
          src: ['**'],
          dest: 'assets/'
        }, {
          expand: true,
          cwd: 'app/',
          src: ['*.*'],
          dest: '/'
        }]
      }
    }
  });


  grunt.registerTask('default', ['configureProxies:connect', 'connect:livereload', 'build', 'watch']);
  grunt.registerTask('build', ['html2js', 'concat:app']);
  grunt.registerTask('package', ['html2js', 'uglify']);
  grunt.registerTask('publish', ['package', 'aws_s3:production']);
};
