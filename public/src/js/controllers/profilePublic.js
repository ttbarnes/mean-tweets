angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (auth, $stateParams, $scope, Restangular, tweetsService) {

  $scope.username = $stateParams.username;

  if($stateParams.username === auth.profile.nickname){
    $scope.usersOwnProfile = true;
  }

  //todo: add promise, errors, no user, etc - maybe use resolve() in routes?

  tweetsService.userSpecificTweets($stateParams.username).getList().then(function (tweets){
    $scope.tweets = tweets;
  });


  $scope.followUser = function(username) {
    console.log('todo: follow user: ', username);
  };

});
