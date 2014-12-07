module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/js/**/*.js',
                dest: 'app/js/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js'
            },
            html: {
                files: ['app/*.html', 'app/assets/css/*.css'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};