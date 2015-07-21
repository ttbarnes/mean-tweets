angular.module('meanTweetsApp').controller('DeleteTweetCtrl', 
  function ($rootScope, $scope, apiEndpointFactory, tweetId, ngDialog) {

    $scope.deleteTweetConfirmation = function() {
      apiEndpointFactory.singleTweet(tweetId).remove().then(function() {
        console.info('removed tweet: ' + tweetId);
        ngDialog.closeAll();
        $rootScope.$broadcast('refreshTweets');
      });
    };

});