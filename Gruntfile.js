module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      gruntfile: {
        files: 'Gruntfile.js'
      },
      html: {
        tasks: ['html2js', 'concat:app'],
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-aws-s3');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('compile', ['html2js', 'uglify'])
  grunt.registerTask('publish', ['compile', 'aws_s3:production'])
};
