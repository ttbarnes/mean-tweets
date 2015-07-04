angular.module('meanExampleApp').controller('ProfileCtrl', function (auth, $state, $stateParams, $scope, Restangular) {

  //temp solution to redirect if user is not auth
  if(!auth.isAuthenticated && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }

  $scope.loggedInUser = auth.profile.nickname;


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
