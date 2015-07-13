angular.module('meanTweetsApp').controller('SearchBoxCtrl', function ($scope, $state) {

  $scope.doQuery = function(query){
    $state.go('search', {searchParam:query} );
  };

  $scope.$on('searchBoxOkToClear', function() {
    if($scope.search && $scope.search.query) {
      $scope.search.query = '';
    }
  });

});