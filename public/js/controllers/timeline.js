angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, Restangular) {

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseTweets.post(newTweet);
    };


});