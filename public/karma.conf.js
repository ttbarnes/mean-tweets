  // Karma configuration
// Generated on Mon Mar 16 2015 21:57:26 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/bower_components/lodash/dist/lodash.js',
      'src/bower_components/angular/angular.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/bower_components/angular-route/angular-route.js',
      'src/bower_components/angular-ui-router/release/angular-ui-router.js',
      'src/bower_components/angular-ui-router-title/src/angular-ui-router-title.js',
      'src/bower_components/auth0.js/build/auth0.js',
      'src/bower_components/a0-angular-storage/dist/angular-storage.js',
      'src/bower_components/angular-jwt/dist/angular-jwt.js',
      'src/bower_components/angular-cookies/angular-cookies.js',
      'src/bower_components/auth0-angular/src/auth0-angular.js',
      'src/bower_components/restangular/dist/restangular.js',
      'src/bower_components/moment/moment.js',
      'src/bower_components/angular-moment/angular-moment.js',
      'src/bower_components/ngDialog/js/ngDialog.js',
      '../node_modules/karma-read-json/karma-read-json.js',
      'src/js/*.js',
      'src/js/**/*.js',
      'src/views/*.html',
      'src/views/partials/*.html',
      'test/unit/**/*.js',
      {pattern: 'test/unit/mock-data/*.json', included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    reporters: ['spec'],


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    
    browsers: ['Chrome_small'],

    //'hide' the browser window: http://stackoverflow.com/a/28015614/1257504
    //currently there is no method to minimise the browser to dock.
    customLaunchers: {
      Chrome_small: {
        base: 'Chrome',
        flags: [
            '--window-size=400,400',
            '--window-position=-400,0'
        ]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
