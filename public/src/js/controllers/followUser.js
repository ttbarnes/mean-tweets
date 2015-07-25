angular.module('meanTweetsApp').controller('FollowUserCtrl', function (currentUserFactory, $scope, Restangular, apiEndpointFactorY) {

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

});
