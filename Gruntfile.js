module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //jshint: {
      //all: ['public/src/js/**/*.js'] 
    //},

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

    uglify: {
      build: {
        files: {
          'public/src/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
        }
      }
    },

    watch: {
      js: {
        files: ['public/src/js/**/*.js'],
        //tasks: ['jshint', 'uglify']
        tasks: ['uglify']
      },
      css: {
        files: ['public/src/scss/*.scss'],
        tasks: ['sass', 'cssmin', 'clean']
      }
    },

    sass: {
      dist: {
        files: {
          'public/src/dist/css/main.css' : 'public/src/scss/main.scss'
        }
      }
    },

    cssmin: {
      add_banner: {
        files: [{
          expand: true,
          cwd: 'public/src/dist/css/',
          src: ['main.css'],
          dest: 'public/src/dist/css/',
          ext: '.min.css'
        }]
      }
    },

    clean: {
      build: {
        src: ['.sass-cache/']
      }
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma');

  //grunt.registerTask('default', ['jshint', 'uglify', 'concurrent']);
  grunt.registerTask('default', [ 'uglify', 'concurrent']);

};