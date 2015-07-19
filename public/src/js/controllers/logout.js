angular.module('meanTweetsApp').controller('LogoutCtrl', function (auth, $scope, $location, store) {
  auth.signout();
  $scope.$parent.message = '';
  store.remove('profile');
  store.remove('token');

  this.locationPath = '/see-you-soon';
  $location.path(this.locationPath);
});