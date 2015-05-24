angular.module('meanExampleApp').controller('ProfileCtrl', function ($scope, tweetsService) {

  tweetsService.tweets.getList().then(function (tweets){
    $scope.tweets = tweets;
  });


});
