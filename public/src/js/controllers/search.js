angular.module('meanExampleApp').controller('SearchCtrl', 
  function ($scope, Restangular, tweetsService) {

    $scope.getTweets = function(searchQuery) {
      $scope.errorMessage = false;
      console.log('getting tweets with..', searchQuery);
      tweetsService.search(searchQuery).getList().then(function (tweets){
        $scope.tweets = tweets;
      }, function (reason){
        $scope.errorMessage = reason.data;
      });

    };

});