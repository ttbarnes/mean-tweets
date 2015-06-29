angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (auth, $stateParams, $scope, Restangular, tweetsService, userProfileService) {

  $scope.profileUsername = $stateParams.username;
  $scope.loggedInUser = auth.profile.nickname;

  if($stateParams.username === auth.profile.nickname){
    $scope.usersOwnProfile = true;
  }

  //todo (server/api): combine into one api call. user: get everything.
  //and think about add promise errors, no user, etc - maybe use resolve() in routes?

  userProfileService.user($scope.profileUsername).getList().then(function (user){ 
    //todo: where/why is the response wrapped in an array?
    //see difference in mongodb and response returned from api.
    $scope.user = user[0];
  });

  tweetsService.userSpecificTweets($scope.profileUsername).getList().then(function (tweets){
    $scope.tweets = tweets;
  });


  $scope.followUser = function(userFollower, userFollowing) {
    if(auth.isAuthenticated) {

      console.log(userFollower + ' wants to follow ' + userFollowing);

      var newFollowings = {
        userFollower: userFollower,
        userFollowing: userFollowing
      }

      //PUT in logged-in user's following array
      Restangular.all('api/profiles/' + userFollower + '/following').customPUT(newFollowings).then(function () {
        console.info(userFollower + ' followed ' + userFollowing);
        console.log('posted to:' + 'api/profiles/' + userFollower + '/following');
      });

      //PUT in 'following' users's followers array
      Restangular.all('api/profiles/' + userFollowing + '/followers').customPUT(newFollowings).then(function () {
        console.info(userFollowing + ' has a new follower: ' + userFollower);
        console.log('posted to:' + 'api/profiles/' + userFollowing + '/following');
      });

    }
    else {
      console.error('unable to follow user - current user is not authenticated');
    }

  };

});
