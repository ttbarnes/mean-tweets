angular.module('meanTweetsApp').controller('ProfileEditCtrl', function (currentUserFactory, $state, $stateParams, $scope, Restangular, userProfileFactory) {

  //temp solution to redirect if user is not auth
  if(!currentUserFactory.isAuth && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }

  $scope.loggedInUser = currentUserFactory.username;

  userProfileFactory.user($scope.loggedInUser).getList().then(function (profile){
    $scope.profile = profile[0];
    $scope.profileDetails = $scope.profile.details[0];
  });

  $scope.updateProfileDetails = function(data) {

    if(currentUserFactory.isAuth) {

      var profileDetails = {
        avatarUrl  : data.avatarUrl,
        websiteUrl : data.websiteUrl,
        location   : data.location,
        about      : data.about
      };

      userProfileFactory.userDetails(currentUserFactory.username).customPUT(profileDetails).then(function () {
        console.log(currentUserFactory.username + ' just updated their profile details');
        console.log('posted to: ' + 'api/profiles/' + currentUserFactory.username + '/details');
      });
    }

  };


});
