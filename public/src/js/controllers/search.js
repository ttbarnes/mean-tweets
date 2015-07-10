angular.module('meanTweetsApp').controller('SearchCtrl', 
  function ($rootScope, $scope, $stateParams, searchResults) {

    $scope.searchQuery = $stateParams.searchParam;
    $scope.searchResults = searchResults;
    $scope.tweets = $scope.searchResults.data;

    if(!$scope.tweets || !$scope.tweets.length) {
      $scope.noSearchResults = true;
    }


    //this should be in promise success
    //$rootScope.$broadcast('searchBoxOkToClear');

    /*
    $scope.getTweets = function(searchQuery) {
      $scope.errorMessage = false;
      console.log('getting tweets with..', searchQuery);
      tweetsFactory.search(searchQuery).getList().then(function (tweets){
        $scope.tweets = tweets;
      }, function (reason){
        $scope.errorMessage = reason.data;
      });
    };
    */


});