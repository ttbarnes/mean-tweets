angular.module('meanExampleApp').controller('ProfilePublicCtrl', function (currentUserFactory, $stateParams, $scope, Restangular, tweetsFactory, userProfileFactory) {

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
    //todo: where/why is the response wrapped in an array?
    //see difference in mongodb and response returned from api.
    var loggedInUserUserFollowing = user[0].following;

    angular.forEach(loggedInUserUserFollowing, function (value) {
      if(value.username === $scope.profileUsername) {
        $scope.loggedInUserFollows = true;
      }
    });

  });


  ////////////////////////////////////////////////////////
  //public profile specifics
  ////////////////////////////////////////////////////////


  //todo (server/api): combine into one api call. user: get everything.
  //and think about add promise errors, no user, etc - maybe use resolve() in routes?

  userProfileFactory.user($scope.profileUsername).getList().then(function (user){ 
    //todo: where/why is the response wrapped in an array?
    //see difference in mongodb and response returned from api.
    $scope.user = user[0];
  });

  tweetsFactory.userSpecificTweets($scope.profileUsername).getList().then(function (tweets){
    $scope.tweets = tweets;
  });

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
