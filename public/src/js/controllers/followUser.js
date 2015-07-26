angular.module('meanTweetsApp').controller('FollowUserCtrl', function (currentUserFactory, $scope, Restangular, apiEndpointFactory) {

  $scope.followUser = function(userFollower, userFollowing) {

    this.newFollowings = {
      userFollower: userFollower,
      userFollowing: userFollowing
    };

    var newFollowings = this.newFollowings;

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

  };

});
