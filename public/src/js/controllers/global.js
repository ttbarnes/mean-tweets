'use strict';

angular.module('meanTweetsApp').controller('GlobalCtrl', function (auth, $scope, $location, store, copyGlobalFactory, ngDialog) {

  $scope.appName = copyGlobalFactory.appName;
  $scope.errorHeading = copyGlobalFactory.errorHeading;
  $scope.auth = auth;

  $scope.loginOrSignup = function() {
    auth.signin({}, function (profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function(error) {
      console.error('There was an error logging in', error);
    });
  };

  $scope.composeTweet = function () {
    ngDialog.open({ template: '../views/partials/dialogs/compose-tweet.html' });
  };

});