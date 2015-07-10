angular.module('meanTweetsApp').controller('SearchCtrl', 
  function ($scope, Restangular, tweetsFactory, resolveData) {

    $scope.resolveData = resolveData;
    console.log($scope.resolveData);

    $scope.getTweets = function(searchQuery) {
      $scope.errorMessage = false;
      console.log('getting tweets with..', searchQuery);
      tweetsFactory.search(searchQuery).getList().then(function (tweets){
        $scope.tweets = tweets;
      }, function (reason){
        $scope.errorMessage = reason.data;
      });
    };

});