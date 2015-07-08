angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (currentUserFactory, $stateParams, $scope, Restangular, tweetsFactory, userProfileFactory, profileUsernameData) {

  $scope.profileUsernameData = profileUsernameData;
  $scope.profileUsername = $stateParams.username;
  $scope.loggedInUserFollows = false;
  $scope.user = profileUsernameData.profile; //user followers, following, favourites


  if($scope.profileUsernameData.success === false) {
    $scope.userNotFound = true;
  }

  if(currentUserFactory.isAuth) {
    $scope.loggedInUser = currentUserFactory.username;

    if($scope.profileUsername === $scope.loggedInUser){
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

    angular.forEach(loggedInUserUserFollowing, function (i) {
      if(i.username === $scope.profileUsername) {
        $scope.loggedInUserFollows = true;
      }
    });

  });

  //tweets
  tweetsFactory.userSpecificTweets($scope.profileUsername).getList().then(function (tweets){
    $scope.tweets = tweets;
  }, function (err){
    $scope.errorMessage = err.data;
  });


  //follow user
  //todo: make individual component/controller/directive/something
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
