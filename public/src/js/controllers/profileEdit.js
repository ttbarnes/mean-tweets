angular.module('meanTweetsApp').controller('ProfileEditCtrl', function (currentUserFactory, $state, $stateParams, $scope, Restangular, apiEndpointFactory) {

  //temp solution to redirect if user is not auth
  if(!currentUserFactory.isAuth && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }

  $scope.loggedInUser = currentUserFactory.username;

  apiEndpointFactory.user($scope.loggedInUser).getList().then(function (profile){
    $scope.profile = profile[0];
    $scope.profileDetails = $scope.profile.details[0];
  });

  $scope.updateProfileDetails = function(data) {

    $scope.loading = true;

    var profileDetails = {
      websiteUrl : data.websiteUrl,
      location   : data.location,
      about      : data.about
    };

    apiEndpointFactory.userDetails(currentUserFactory.username).customPUT(profileDetails).then(function () {
      $scope.loading = false;
      $scope.loadingSuccess = true;
      console.log(currentUserFactory.username + ' just updated their profile details');
      console.log('posted to: ' + 'api/profiles/' + currentUserFactory.username + '/details');
    });

  };


});
