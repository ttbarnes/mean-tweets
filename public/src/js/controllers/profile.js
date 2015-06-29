angular.module('meanExampleApp').controller('ProfileCtrl', function (auth, $state, $stateParams, $scope) {


  //temp solution to redirect if user is not auth
  if(!auth.isAuthenticated && $state.$current.data.auth.required === true) {
    $state.go('loginRequired');
  }


});
