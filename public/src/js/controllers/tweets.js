angular.module('meanExampleApp').controller('TweetsCtrl', 
  function ($scope, Restangular) {

    $scope.maxCharLength = 140;

    (function getAllTweets(){
      baseTweets = Restangular.all('api/tweets');
    })();

    baseTweets.getList().then(function(tweets) {
      $scope.tweets = tweets;
    });

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
      console.info('posted a tweet...');

      baseTweets.getList().then(function(tweets) {
        $scope.tweets = tweets;
        console.info('got new tweets');
      });

    };

});