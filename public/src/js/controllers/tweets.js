angular.module('meanExampleApp').controller('TweetsCtrl', 
  function ($scope, tweetsService) {

    $scope.maxCharLength = 140;

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
    };


    $scope.tweets = tweetsService.tweets;

});