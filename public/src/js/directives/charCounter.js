'use strict';

angular.module('meanTweetsApp').directive('charCounter', function () {

    return {
      restrict: 'E',
      scope: {
        inputElm: '=',
        maxLength: '=',
      },
      templateUrl: 'views/partials/char-counter.html'
    };

  });

