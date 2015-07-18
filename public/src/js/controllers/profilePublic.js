angular.module('meanTweetsApp').controller('ProfilePublicCtrl', function (currentUserFactory, $stateParams, $scope, Restangular, tweetsFactory, userProfileFactory, profileUsernameData, ngDialog) {

  $scope.profileUsernameData = profileUsernameData;  //public profilc data from routes resolve (success, profile data)
  $scope.profileUser = profileUsernameData.profile;  //public profile user's followers, following, favourites
  $scope.profileUserDetails = profileUsernameData.profile.details[0];  //public profile user's details
  $scope.profileUsername = $stateParams.username;    //public profile username from $stateParams

  if($scope.profileUsernameData.success === false) {
    $scope.userNotFound = true;
  }

  else {
    //user found

    //loggedIn user specifics - follow/following this user, delete tweet
    if(currentUserFactory.isAuth) {
      $scope.loggedInUser = currentUserFactory.username;

      if($scope.profileUsername === $scope.loggedInUser){
        $scope.usersOwnProfile = true;
      }

      //check the profile's followers to see if the loggedInUser is already following
      angular.forEach($scope.profileUser.followers, function (i) {
        if(i.username === $scope.loggedInUser) {
          $scope.loggedInUserFollows = true;
        }
      });

      //follow user
      //todo: make individual component/controller/directive/something
      $scope.followUser = function(userFollower, userFollowing) {
        if(currentUserFactory.isAuth) {

          console.log(userFollower + ' wants to follow ' + userFollowing);

          var newFollowings = {
            userFollower: userFollower,
            userFollowing: userFollowing
          };

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

      $scope.deleteTweetDialog = function(tweetId) {
        console.log($scope.loggedInUser + ' want\'s to remove tweet: ' + tweetId);
        ngDialog.open({ 
          scope: $scope,
          template: '../views/partials/dialogs/delete-tweet.html',
          controller: 'DeleteTweetCtrl',
          resolve: {
              tweetId: function depFactory() {
                  return tweetId;
              }
          }
        });
      };

    }
  }

});
