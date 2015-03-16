module.exports = function(grunt) {

  grunt.initConfig({

    //jshint: {
      //all: ['public/src/js/**/*.js'] 
    //},

    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
        }
      }
    },

    watch: {
      js: {
        files: ['public/src/js/**/*.js'],
        //tasks: ['jshint', 'uglify']
        tasks: ['uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },

    karma: {
      unit: {
        configFile: 'public/karma.conf.js'
      }
    }

  });

  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma');

  //grunt.registerTask('default', ['jshint', 'uglify', 'concurrent']);
  grunt.registerTask('default', [ 'uglify', 'concurrent']);

};