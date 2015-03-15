angular.module('meanExampleApp').controller('GlobalCtrl', function (auth, $scope, copyGlobalService) {

  $scope.appName = copyGlobalService.appName;
  $scope.auth = auth;

});