angular.module('meanTweetsApp').controller('TweetSingleCtrl', 
  function ($stateParams, $scope, Restangular, tweetsFactory) {

    this.tweetId = $stateParams.tweetId;

    $scope.getTweet = function() {
      //todo: handle errors
      tweetsFactory.singleTweet(this.tweetId).get().then(function (tweet){
        $scope.tweet = [ tweet ];
        console.info('got the tweet');
      });
    };

    $scope.getTweet();

});