angular.module('meanTweetsApp').controller('FollowUserCtrl', function (currentUserFactory, $scope, Restangular, apiEndpointFactory) {

  $scope.followUser = function(userFollower, userFollowing) {
    if(currentUserFactory.isAuth) {

      console.log(userFollower + ' wants to follow ' + userFollowing);

      var newFollowings = {
        userFollower: userFollower,
        userFollowing: userFollowing
      };

      //PUT in logged-in user's following array
      apiEndpointFactory.userFollowing(userFollower).customPUT(newFollowings).then(function () {
        console.info(userFollower + ' followed ' + userFollowing);
        console.log('posted to:' + 'api/profiles/' + userFollower + '/following');
      });

      //PUT in 'following' users's followers array
      apiEndpointFactory.userFollowers(userFollowing).customPUT(newFollowings).then(function () {
        console.info(userFollowing + ' has a new follower: ' + userFollower);
        console.log('posted to:' + 'api/profiles/' + userFollowing + '/followers');
      });

    }
    else {
      console.error('unable to follow user - current user is not authenticated');
    }
  };

});
