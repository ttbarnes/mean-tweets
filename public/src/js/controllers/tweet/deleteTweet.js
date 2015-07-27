angular.module('meanTweetsApp').controller('DeleteTweetCtrl', 
  function ($rootScope, $scope, apiEndpointFactory, tweetId, ngDialog) {

    $scope.deleteTweetConfirmation = function() {
      $scope.loading = true;
      apiEndpointFactory.singleTweet(tweetId).remove().then(function() {
        $scope.loading = false;
        console.info('removed tweet: ' + tweetId);
        ngDialog.closeAll();
        $rootScope.$broadcast('refreshTweets');
      });
    };

});