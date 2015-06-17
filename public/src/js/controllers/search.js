angular.module('meanExampleApp').controller('SearchCtrl', 
  function ($scope, Restangular, tweetsService) {

    $scope.getTweets = function(searchQuery) {
      console.log('getting tweets with..', searchQuery);
      //todo: handle errors
      tweetsService.search(searchQuery).getList().then(function (tweets){
        $scope.tweets = tweets;
        console.info('got new tweets');
      });
    };

});