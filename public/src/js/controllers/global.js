angular.module('meanTweetsApp').controller('GlobalCtrl', function (auth, $scope, $location, store, copyGlobalFactory, ngDialog) {

  $scope.appName = copyGlobalFactory.appName;
  $scope.auth = auth;

  $scope.loginOrSignup = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path("/");
    }, function(error) {
      console.error("There was an error logging in", error);
    });
  };

  $scope.searchTweets = function(searchQuery) {
    console.log('searching with: ', searchQuery);
  };

  $scope.composeTweet = function () {
    ngDialog.open({ template: '../views/partials/post-tweet.html' });
  };

});