angular.module('meanExampleApp').controller('SignupCtrl', function (auth, $scope, $location, store) {
  
  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path("/");
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

});
