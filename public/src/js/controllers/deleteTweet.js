angular.module('meanTweetsApp').controller('DeleteTweetCtrl', 
  function ($scope, Restangular, tweetsFactory, tweetId) {

    $scope.deleteTweetConfirmation = function() {
      tweetsFactory.singleTweet(tweetId).remove().then(function () {
        console.info('removed tweet: ' + tweetId);
      });
    };

});