'use strict';

angular.module('meanTweetsApp').controller('LoginCtrl', function (auth, $scope, $location, store, Restangular) {

  $scope.user = 'test1@test.com';
  $scope.pass = 'password';
  
  $scope.message = {text: ''};

  $scope.onLoginSuccess = function(profile, token) {
    $scope.message.text = '';
    store.set('profile', profile);
    store.set('token', token);
    $location.path('/');
    $scope.loading = false;

    var newUser = {
      username: auth.profile.nickname
    };

    Restangular.all('api/profiles/' + newUser.username).post(newUser).then(function(){
      console.info('posted a new user: ', newUser.username);
    }, function (){
      console.info('user has logged in previously.');
    });
  };

  $scope.onLoginFailed = function() {
    $scope.message.text = 'invalid credentials';
    $scope.loading = false;
  };

  $scope.submit = function () {
    $scope.loading = true;
    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.user,
      password: $scope.pass,
      authParams: {
        scope: 'openid name email'
      }
    }, $scope.onLoginSuccess, $scope.onLoginFailed);
  };

});
