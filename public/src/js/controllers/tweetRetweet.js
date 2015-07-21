angular.module('meanTweetsApp').controller('TweetRetweetCtrl', function (currentUserFactory, apiEndpointFactory, $scope) {

  $scope.retweetTweet = function(tweetId) {

    this.newRetweet = {
      username: currentUserFactory.username
    };

    var newRetweet = this.newRetweet;

    //PUT the newRetweet username into the tweet's retweets array
    apiEndpointFactory.retweets(tweetId).customPUT(newRetweet).then(function () {
      console.log('posted new retweet to: ' + tweetId);
    });

  };

  $scope.removeRetweet = function(tweetId, retweetId) {

    //REMOVE retweet from the tweet's retweets array
    apiEndpointFactory.singleRetweet(tweetId, retweetId).remove().then(function(){ 
      console.log('removed retweet ' + retweetId + ' from tweet ' + tweetId);
    });

  };

});
