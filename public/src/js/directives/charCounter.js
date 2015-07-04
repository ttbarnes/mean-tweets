angular.module('meanExampleApp').directive('charCounter', function () {

    return {
      restrict: 'E',
      scope: {
        inputElm: "=",
        maxLength: "=",
      },
      templateUrl: 'views/partials/char-counter.html'
    };

  });

