angular.module('meanTweetsApp').controller('DeleteTweetCtrl', 
  function ($rootScope, $scope, tweetsFactory, tweetId, ngDialog) {

    $scope.deleteTweetConfirmation = function() {
      tweetsFactory.singleTweet(tweetId).remove().then(function() {
        console.info('removed tweet: ' + tweetId);
        ngDialog.closeAll();
        $rootScope.$broadcast('refreshTweets');
      });
    };

});