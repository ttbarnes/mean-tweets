angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, Restangular) {

    (function getAllTweets(){
      baseTweets = Restangular.all('api/tweets');
    })();

    baseTweets.getList().then(function(tweets) {
      $scope.tweets = tweets;
    });

    function tweetsObject() { 
      $scope.tweets = baseTweets.getList().$object;
    };

    setInterval(tweetsObject, 10000);

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
    };


});