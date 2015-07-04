angular.module('meanExampleApp').controller('ProfileCtrl', function (auth, $state, $stateParams, $scope) {


  //temp solution to redirect if user is not auth
  if(!auth.isAuthenticated && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }

  $scope.updateProfileDetails = function(data) {

    var profileDetails = {
      websiteUrl : data.websiteUrl,
      location   : data.location,
      about      : data.about
    };

    console.log(profileDetails);

  }


});
