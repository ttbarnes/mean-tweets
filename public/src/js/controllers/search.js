angular.module('meanTweetsApp').controller('SearchCtrl', 
  function ($rootScope, $scope, $stateParams, searchResults) {

    $scope.searchQuery = $stateParams.searchParam;
    $scope.searchResults = searchResults;
    $scope.tweets = $scope.searchResults.data;

    if(!$scope.tweets || !$scope.tweets.length) {
      $scope.noSearchResults = true;
    }
    else {
      $rootScope.$broadcast('searchBoxOkToClear');
    }

});