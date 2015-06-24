angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (auth, $stateParams, $scope, Restangular, tweetsService) {

  $scope.username = $stateParams.username;
  $scope.profileUsername = auth.profile.nickname;

  if($stateParams.username === auth.profile.nickname){
    $scope.usersOwnProfile = true;
  }

  //todo: add promise, errors, no user, etc - maybe use resolve() in routes?

  tweetsService.userSpecificTweets($stateParams.username).getList().then(function (tweets){
    $scope.tweets = tweets;
  });


  $scope.followUser = function(userFollower, userFollowing) {
    if(auth.isAuthenticated) {

      console.log(userFollower + ' wants to follow ' + userFollowing);

      /*
      var bla = {
        userFollower: userFollower,
        userFollowing: userFollowing
      };

      Restangular.all('api/profiles/' + userFollowing).post(bla).then(function(){
        console.info(userFollowing + ' has a new follower:  ' + userFollower);
      });

      Restangular.all('api/profiles/' + userFollower).post(bla).then(function(){
        console.info(userFollower + ' followed ' + userFollowing);
      });
      */

    }
    else {
      console.error('unable to follow user - current user is not authenticated');
    }

  };

});
