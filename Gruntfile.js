module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  //
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var livereloadSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  var serveStatic = require('serve-static');
  var modRewrite = require('connect-modrewrite');
  var path = require('path');


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // The actual grunt server settings
    connect: {
      options: {
        port: 5000,
        hostname: '0.0.0.0'
      },
      //TODO: use default dev servers so as not to depend to a local enviroment.
      //TODO: Use nginx like in production.
      proxies: [{
        context: '/api',
        host: 'localhost',
        port: process.env.PORT || 3002
      }, {
        context: '/images',
        host: 'localhost',
        port: 3001,
        rewrite: {
          '^/images': ''
        }
      }],
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              proxySnippet,
              livereloadSnippet,
              //all angular routes go to index file
              modRewrite(['!^/.*\\..*$ /index-local.html [L]']),
              serveStatic(path.resolve("app"), {
                'index': ['index-local.html']
              })
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
      },
    },
    injector: {
      options: {
        relative: true,
        addRootSlash: false
      },
      local_dependencies: {
        files: {
          'app/index-local.html': ['app/js/**/*.js', 'app/assets/js/templates.js', 'app/assets/**/*.css'],
        }
      }
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
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      beforebuild: ['app/js/**/*.js'],
    },
    fixmyjs: {
      options: {
        curly: true,
        quotmark: 'single',
        plusplus: true,
        asi: false
      },
      all: {
        files: [{
          expand: true,
          cwd: 'app/js/',
          src: ['**/*.js'],
          dest: 'app/js/',
          ext: '.js'
        }]
      }
    },
    concurrent: {
      build: ['html2js', 'injector', 'wiredep']
    }
  });

  grunt.loadNpmTasks('grunt-fixmyjs');
  grunt.loadNpmTasks('grunt-injector');

  grunt.registerTask('default', ['configureProxies:connect', 'connect:livereload', 'build', 'watch']);
  grunt.registerTask('build', ['concurrent:build']);
  grunt.registerTask('package', ['html2js', 'uglify']);
  grunt.registerTask('publish', ['package', 'aws_s3:production']);
};
