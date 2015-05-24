angular.module('meanExampleApp').controller('ProfileCtrl', function ($scope, Restangular, tweetsService) {

  tweetsService.tweets.getList().then(function (tweets){
    $scope.tweets = tweets;
  });

});
