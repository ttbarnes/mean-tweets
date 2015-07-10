angular.module('meanTweetsApp').controller('SearchBoxCtrl', function ($scope) {


  $scope.$on('searchBoxOkToClear', function() {
    $scope.search.query = '';
  });


});