angular.module('meanTweetsApp').controller('SearchCtrl', 
  function ($rootScope, $scope, $stateParams, Restangular, tweetsFactory, resolveData) {

    $scope.resolveData = resolveData;


    //this should be in promise success
    $rootScope.$broadcast('searchCompleted');

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