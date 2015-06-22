angular.module('meanExampleApp').controller('ProfilePublicCtrl', function ($stateParams, $scope, Restangular, tweetsService) {

  $scope.username = $stateParams.username;

  //todo: add promise, errors, no user, etc - maybe use resolve() in routes?

  tweetsService.userSpecificTweets($stateParams.username).getList().then(function (tweets){
    $scope.tweets = tweets;
  });

});
