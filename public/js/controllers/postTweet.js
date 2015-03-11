angular.module('meanExampleApp').controller('PostTweetCtrl', 
  function ($scope) {

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
    };

});
