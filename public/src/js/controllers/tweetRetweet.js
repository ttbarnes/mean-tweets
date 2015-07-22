angular.module('meanTweetsApp').controller('TweetRetweetCtrl', function (currentUserFactory, apiEndpointFactory, $scope) {

  $scope.retweetTweet = function(tweetId) {

    $scope.loading = true;

    this.newRetweet = {
      username: currentUserFactory.username
    };

    var newRetweet = this.newRetweet;

    //PUT the newRetweet username into the tweet's retweets array
    apiEndpointFactory.retweets(tweetId).customPUT(newRetweet).then(function (){
      $scope.loading = false;
      console.log('posted new retweet to: ' + tweetId);
    });

  };

  $scope.removeRetweet = function(tweetId, retweetId) {

    $scope.loading = true;

    //REMOVE retweet from the tweet's retweets array
    apiEndpointFactory.singleRetweet(tweetId, retweetId).remove().then(function(){ 
      $scope.loading = false;
      console.log('removed retweet ' + retweetId + ' from tweet ' + tweetId);
    });

  };

});
