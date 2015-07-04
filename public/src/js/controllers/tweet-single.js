angular.module('meanExampleApp').controller('TweetSingleCtrl', 
  function ($stateParams, $scope, Restangular, tweetsService) {

    var tweetId = $stateParams.tweetId;

    function getTweet() {
      //todo: handle errors
      tweetsService.singleTweet(tweetId).get().then(function (tweet){
        $scope.tweet = [ tweet ];
        console.info('got the tweet');
      });
    };

    getTweet();

});