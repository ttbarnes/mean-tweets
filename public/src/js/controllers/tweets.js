angular.module('meanExampleApp').controller('TweetsCtrl', 
  function ($scope, Restangular, tweetsService) {

    $scope.maxCharLength = 140;

    tweetsService.tweets.getList().then(function (tweets){
      $scope.tweets = tweets;
    });

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      tweetsService.tweets.post(newTweet).then(function(){
        console.info('posted a tweet');
        //todo: clear the form input
      });

      tweetsService.tweets.getList().then(function (tweets){
        $scope.tweets = tweets;
        console.info('got new tweets');
      });

    };

});