angular.module('meanExampleApp').controller('ProfileCtrl', function (auth, $state, $stateParams, $scope, Restangular, userProfileService) {

  //temp solution to redirect if user is not auth
  if(!auth.isAuthenticated && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }

  $scope.loggedInUser = auth.profile.nickname;

  userProfileService.user($scope.loggedInUser).getList().then(function (profile){
    $scope.profile = profile;
    $scope.profileDetails = $scope.profile[0].details[0];
  });

  $scope.updateProfileDetails = function(data) {

    if(auth.isAuthenticated) {

      var profileDetails = {
        websiteUrl : data.websiteUrl,
        location   : data.location,
        about      : data.about
      };

      console.log(profileDetails);

      Restangular.all('api/profiles/' + $scope.loggedInUser + '/details').customPUT(profileDetails).then(function () {
        console.log($scope.loggedInUser + 'just updated their profile details');
        console.log('posted to: ' + 'api/profiles/' + $scope.loggedInUser + '/details');
      });
    }

  }


});
