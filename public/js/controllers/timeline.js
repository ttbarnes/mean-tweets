angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, Restangular) {

    var baseTweets = Restangular.all('api/tweets');

    baseTweets.getList().then(function(tweets) {
      $scope.tweets = tweets;
    });

    function getTheTweets() { 
      $scope.tweets = baseTweets.getList().$object;
    };

    setInterval(getTheTweets, 10000);

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
    };



});