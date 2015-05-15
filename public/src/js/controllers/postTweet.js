angular.module('meanExampleApp').controller('PostTweetCtrl', 
  function ($scope) {

    $scope.maxCharLength = 140;

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
    };

});
