angular.module('meanTweetsApp').controller('SearchCtrl', 
  function ($rootScope, $scope, $stateParams, searchResults) {

    $scope.searchQuery = $stateParams.searchParam;
    $scope.tweets = searchResults.data;

    if(!$scope.tweets || !$scope.tweets.length) {
      $scope.noSearchResults = true;
    }
    else {
      console.log('- - - BROADCAST BEING CALLED...')
      $rootScope.$broadcast('searchBoxOkToClear');
    }

});