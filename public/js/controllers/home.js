angular.module('meanExampleApp').controller('HomeCtrl', function (auth, $scope) {

  $scope.auth = auth;
  /*
  $scope.$watch('auth.profile.name', function(name) {
    if (!name) {
      return;
    }
    $scope.message.text = 'Welcome ' + auth.profile.name + '!';
  });
  */


});
