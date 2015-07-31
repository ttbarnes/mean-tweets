angular.module('meanTweetsApp').controller('ProfilePublicCtrl', function (currentUserFactory, apiEndpointFactory, $stateParams, $scope, Restangular, profileUsernameData, ngDialog) {

  $scope.profileUsernameData = profileUsernameData;  //public profilc data from routes resolve (success, profile data)
  $scope.profileUser = profileUsernameData.profile;  //public profile user's followers, following, favourites

  if(profileUsernameData.profile && profileUsernameData.profile.details && profileUsernameData.profile.details[0]) {
    $scope.profileUserDetails = profileUsernameData.profile.details[0];  //public profile user's details
  }

  $scope.profileUsername = $stateParams.username;    //public profile username from $stateParams

  if($scope.profileUsernameData.success === false) {
    $scope.userNotFound = true;
  }

  else {
    //user found

    //temporary solution to display users's tweet count.
    //ideally, tweet count and other profile details should be
    //fetched and returned with one api call.
    //for the time being, we could do this, or use $emit/$broadcast.
    apiEndpointFactory.userTweets($scope.profileUsername).getList().then(function (tweets){
      $scope.tweetsCount = tweets.length;
    });

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
