angular.module('meanTweetsApp').controller('LoginCtrl', function (auth, $scope, $location, store, Restangular) {
  $scope.user = 'test1@test.com';
  $scope.pass = 'password';
  
  $scope.message = {text: ''};

  function onLoginSuccess(profile, token) {
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
    }, function (reason){
      console.info('user has logged in previously.');
    });

  }

  function onLoginFailed() {
    $scope.message.text = 'invalid credentials';
    $scope.loading = false;
  }

  $scope.reset = function() {
    auth.reset({
      email: 'hello@bye.com',
      password: 'hello',
      connection: 'Username-Password-Authentication'
    });
  };

  $scope.submit = function () {
    $scope.message.text = 'loading...';
    $scope.loading = true;
    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.user,
      password: $scope.pass,
      authParams: {
        scope: 'openid name email'
      }
    }, onLoginSuccess, onLoginFailed);

  };

  $scope.doGoogleAuthWithPopup = function () {
    $scope.message.text = 'loading...';
    $scope.loading = true;

    auth.signin({
      popup: true,
      connection: 'google-oauth2',
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
  };

});
