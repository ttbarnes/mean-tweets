angular.module('meanTweetsApp').controller('TweetSingleCtrl', 
  function ($stateParams, $scope, Restangular, tweetsFactory) {

    var tweetId = $stateParams.tweetId;

    function getTweet() {
      //todo: handle errors
      tweetsFactory.singleTweet(tweetId).get().then(function (tweet){
        $scope.tweet = [ tweet ];
        console.info('got the tweet');
      });
    };

    getTweet();

});