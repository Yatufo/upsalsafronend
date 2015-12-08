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
    env: {
      dev: {
        INDEX: 'index-local.html'
      },
      prod: {
        INDEX: 'index.html'
      }
    },
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
              modRewrite(['!^/.*\\..*$ /' + process.env.INDEX + ' [L]']),
              serveStatic(path.resolve("app"), {
                'index': [process.env.INDEX]
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
          'app/index-local.html': ['app/js/**/*.js', 'app/assets/**/*.css'],
        }
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
    html2js: {
      options: {
        base: "app",
        module: "eventify",
        existingModule: true,
        singleModule: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['app/views/**/*.html'],
        dest: 'app/assets/js/templates.js'
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
        src: [
          'app/dependencies/**/angular-storage.min.js',
          'app/dependencies/**/angular-cookies.min.js',
          'app/dependencies/**/angular-jwt.min.js',
          'app/dependencies/**/angular-resource.min.js',
          'app/dependencies/**/angular-route.min.js',
          'app/dependencies/**/ng-file-upload-all.min.js',
          'app/dependencies/**/auth0-angular.min.js',
          'app/dependencies/**/auth0-lock.min.js',
          'app/dependencies/**/auth0.min.js',
          'app/dependencies/**/moment.min.js',
          'app/dependencies/**/ng-infinite-scroll.min.js',
          'app/dependencies/**/underscore-min.js',
          'app/dependencies/angular-bootstrap-datetimepicker/src/js/datetimepicker.js'
        ],
        dest: 'app/assets/js/dependencies.min.js',
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          dest: 'app/assets/css/<%= pkg.name %>.min.css',
          ext: '.min.css',
          src: ['app/assets/css/*.css', 'app/dependencies/angular-bootstrap-datetimepicker/src/css/datetimepicker.css']
        }]
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
    concurrent: {
      build: ['injector', 'wiredep']
    }
  });

  grunt.loadNpmTasks('grunt-fixmyjs');
  grunt.loadNpmTasks('grunt-injector');

  grunt.registerTask('default', ['env:dev', 'concurrent:build', 'serve']);
  grunt.registerTask('prod', ['env:prod', 'package', 'serve']);
  grunt.registerTask('serve', ['configureProxies:connect', 'connect:livereload', 'watch']);
  grunt.registerTask('package', ['html2js', 'uglify', 'cssmin']);
  grunt.registerTask('publish', ['package', 'aws_s3:production']);
};
