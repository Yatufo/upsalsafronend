module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      gruntfile: {
        files: 'Gruntfile.js'
      },
      html: {
        tasks: ['concat', 'uglify'],
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
      build: {
        src: ['app/js/**/*.js', '!app/js/*.min.js'],
        dest: 'app/assets/js/<%= pkg.name %>.min.js'
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
      main: {
        src: ['app/js/**/*.js'],
        dest: 'app/assets/js/<%= pkg.name %>.js',
      },
      deps: {
        src: ['app/bower_components/**/*min.js', '!**/angular.min.js', '!**/bootstrap.min.js', '!**/jquery.min.js'],
        dest: 'app/assets/js/dependencies.min.js',
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wiredep');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
