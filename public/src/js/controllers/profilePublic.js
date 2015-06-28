angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (auth, $stateParams, $scope, Restangular, tweetsService, userProfileService) {

  $scope.username = $stateParams.username;
  $scope.profileUsername = auth.profile.nickname;

  if($stateParams.username === auth.profile.nickname){
    $scope.usersOwnProfile = true;
  }

  //todo (server/api): combine into one api call. user: get everything.
  //and think about add promise errors, no user, etc - maybe use resolve() in routes?

  userProfileService.user('support').getList().then(function (user){ 
    //todo: where/why is the response wrapped in an array?
    //see difference in mongodb and response returned from api.
    $scope.user = user[0];
  });

  tweetsService.userSpecificTweets($stateParams.username).getList().then(function (tweets){
    $scope.tweets = tweets;
  });



  $scope.followUser = function(userFollower, userFollowing) {
    if(auth.isAuthenticated) {

      console.log(userFollower + ' wants to follow ' + userFollowing);

      var newFollowings = {
        username: userFollowing
      };


      Restangular.all('api/profiles/' + userFollower + '/following').post(newFollowings).then(function(){
        console.info(userFollower + ' followed ' + userFollowing);
      });

    }
    else {
      console.error('unable to follow user - current user is not authenticated');
    }

  };

});
