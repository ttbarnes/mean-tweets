'use strict';

//this gruntfile is adapted from yeoman generator

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
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

    watch: {
      js: {
        files: ['public/src/js/**/*.js', 'public/test/unit/{,*/}*.js'],
        tasks: ['jshint', 'karma']
      },
      css: {
        files: ['public/src/scss/*.scss', 'public/src/scss/**/*.scss'],
        //tasks: ['sass', 'cssmin']
        tasks: ['sass']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    sass: {
      dist: {
        files: {
          'public/src/dist/css/main.css' : 'public/src/scss/main.scss'
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'public/src/js/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'public/test/.jshintrc',
          ignores: ['public/test/unit/spec-helper.js']
        },
        src: ['public/test/unit/*/{,*/}*.js']
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
          '<%= yeoman.dist %>/css/{,*/}*.css',
          '<%= yeoman.dist %>/img/{,*/}*.jpg',
          '<%= yeoman.dist %>/img/{,*/}*.png',
          '<%= yeoman.dist %>/img/{,*/}*.gif'
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
      html: ['<%= yeoman.dist %>/index.html', '<%= yeoman.dist %>/views/**/*.html'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/css',
          '<%= yeoman.dist %>/img'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.

    /*
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/src/dist/css/',
          src: ['main.css'],
          dest: 'public/src/dist/css/',
          ext: '.min.css'
        }]
      }
    },
    */

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
      options:{
        mangle: false
      },
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
          src: ['*.html', 'public/src/views/**/*.html'],
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
            'views/**/*.html'
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
        src: '{,*/}*.styles'
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
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/src/dist/img/'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      server: [
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

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'public/karma.conf.js',
        singleRun: true
      }
    },

    preprocess : {
      dev : {
        src : [ 'server.js', 'app/routes.js', 'public/src/dist/app.js' ],
        options: {
          inline : true,
          context : {
            DEVELOPMENT: true
          }
        }
      },
      prod : {
        src : [ 'server.js', 'app/routes.js', 'public/src/dist/app.js' ],
        options: {
          inline : true,
          context : {
            PRODUCTION: true
          }
        }
      },
    }

  });

  grunt.registerTask('serve', function () {
    grunt.task.run([
      'clean:dist',
      'copy:jsDist',
      'preprocess:dev',
      'jshint',
      'karma',
      'sass',
      'concurrent:server'
    ]);
  });

  grunt.registerTask('default', function(){
    grunt.task.run('serve');
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:jsDist',
    'preprocess:prod',
    'useminPrepare',
    'concurrent:dist',
    'copy:dist',
    'sass',
    'concat',
    'uglify',
    'imagemin',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('heroku:', function(){
    grunt.task.run('build');
  });


};