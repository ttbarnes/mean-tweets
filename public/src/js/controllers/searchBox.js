angular.module('meanTweetsApp').controller('SearchBoxCtrl', function ($scope) {

  $scope.$on('searchBoxOkToClear', function() {
    if($scope.search && $scope.search.query) {
      $scope.search.query = '';
    }
  });

});