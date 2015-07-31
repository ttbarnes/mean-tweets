'use strict';

// this gruntfile is adapted from yeoman generator

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath,
    dist: '<%= yeoman.app %>/dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      /*
      bower: {
        files: ['bower.json']
      },
      */
      js: {
        files: ['public/src/js/**/*.js', 'public/test/unit/{,*/}*.js'],
        tasks: ['jshint', 'karma'],
        /*
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
        */
      },
      jsTest: {
        files: ['public/test/unit/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      css: {
        files: ['public/src/scss/*.scss', 'public/src/scss/**/*.scss'],
        tasks: ['sass', 'cssmin']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      //livereload: {
        //options: {
          //livereload: '<%= connect.options.livereload %>'
        //},
        //files: [
          //'<%= yeoman.app %>/{,*/}*.html',
          //'.tmp/styles/{,*/}*.css',
          //'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        //]
      //}
      //
    },

    sass: {
      dist: {
        files: {
          'public/src/dist/main.css' : 'public/src/scss/main.scss'
        }
      }
    },


    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // The actual grunt server settings
    /*connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    */

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/public/src/js/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'public/test/.jshintrc'
        },
        src: ['public/test/unit/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      build: {
        src: ['.sass-cache/']
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '.sass-cache/',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/js/{,*/}*.js',
          '<%= yeoman.dist %>/css/{,*/}*.css'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/index.html'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/css'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    
    //TB: jhint ignore:line required due to grunt task name
    //TB: jhint wants this to be camelCase

     cssmin: {
       add_banner: { // jshint ignore:line
        files: [{
          expand: true,
          cwd: 'public/src/dist/',
          src: ['main.css'],
          dest: 'public/src/dist/',
          ext: '.min.css'
        }]
      }
     },
     concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= yeoman.app %>/js/{,*/}*.js'],
        dest: '<%= yeoman.dist %>/js/main.js'
      }
    },
     uglify: {
       dist: {
         files: {
           '<%= yeoman.dist %>/js/main.js': [ '<%= yeoman.app %>/js/{,*/}*.js' ]
         }
       }
     },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'public/src/views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      jsDist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/js',
          dest: '<%= yeoman.dist %>',
          src: [
            'app.js'
          ]
        }]
      },

    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      server: [
        //'copy:styles'
        'nodemon', 
        'watch'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'public/karma.conf.js',
        singleRun: true
      }
    },

    preprocess : {
      dev : {
        src : [ 'public/src/dist/app.js' ],
        options: {
          inline : true,
          context : {
            DEVELOPMENT: true
          }
        }
      },
      prod : {
        src : [ 'public/src/dist/app.js' ],
        options: {
          inline : true,
          context : {
            PRODUCTION: true
          }
        }
      },
    }

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:dist',
      'copy:jsDist',
      'preprocess:dev',
      'sass',
      'cssmin',
      'jshint',
      'karma',
      'concurrent:server'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    //'connect:test',
    'nodemon',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'copy:dist',
    'sass',
    'cssmin',
    'concat',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  /*
  grunt.registerTask('default', [
    'jshint',
    'karma',
    'clean:dist',
    'sass',
    'cssmin',
    'concurrent:server'
  ]);
  */

  grunt.registerTask('heroku:', [
    'copy:jsDist',
    'preprocess:prod',
    'cssmin'
  ]);

};
