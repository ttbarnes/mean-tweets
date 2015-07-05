angular.module('meanExampleApp').controller('ProfileCtrl', function (auth, currentUserFactory, $state, $stateParams, $scope, Restangular, userProfileService) {

  //temp solution to redirect if user is not auth
  if(!currentUserFactory.isAuth && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }

  $scope.loggedInUser = auth.profile.nickname;

  userProfileService.user($scope.loggedInUser).getList().then(function (profile){
    $scope.profile = profile;
    $scope.profileDetails = $scope.profile[0].details[0];
  });

  $scope.updateProfileDetails = function(data) {

    if(currentUserFactory.isAuth) {

      var profileDetails = {
        websiteUrl : data.websiteUrl,
        location   : data.location,
        about      : data.about
      };

      console.log(profileDetails);

      Restangular.all('api/profiles/' + currentUserFactory.username + '/details').customPUT(profileDetails).then(function () {
        console.log(currentUserFactory.username + ' just updated their profile details');
        console.log('posted to: ' + 'api/profiles/' + currentUserFactory.username + '/details');
      });
    }

  }


});
