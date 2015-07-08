angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (currentUserFactory, $stateParams, $scope, Restangular, tweetsFactory, userProfileFactory, profileUsernameData) {

  $scope.profileUsernameData = profileUsernameData;

  if($scope.profileUsernameData.success === false) {
    $scope.userNotFound = true;
  }

  $scope.profileUsername = $stateParams.username;
  $scope.loggedInUserFollows = false;

  if(currentUserFactory.isAuth) {

    $scope.loggedInUser = currentUserFactory.username;

    if($stateParams.username === currentUserFactory.username){
      $scope.usersOwnProfile = true;
    }

  }

  ////////////////////////////////////////////////////////
  //current user things - should be service or something
  //actually, this query should be done with API - find X username in Y profile. Return true/false
  ////////////////////////////////////////////////////////

  userProfileFactory.user(currentUserFactory.username).getList().then(function (user){
    //see difference in mongodb and response returned from api.
    var loggedInUserUserFollowing = user[0].following;

    angular.forEach(loggedInUserUserFollowing, function (value) {
      if(value.username === $scope.profileUsername) {
        $scope.loggedInUserFollows = true;
      }
    });

  });

  //set user followers, following, favourites from profileUsernameData.
  $scope.user = profileUsernameData.profile;
  console.log($scope.user);


  //tweets
  tweetsFactory.userSpecificTweets($scope.profileUsername).getList().then(function (tweets){
    $scope.tweets = tweets;
  }, function (err){
    $scope.errorMessage = err.data;
  });

  //follow user
  $scope.followUser = function(userFollower, userFollowing) {
    if(currentUserFactory.isAuth) {

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
