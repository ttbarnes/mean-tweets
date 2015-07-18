angular.module('meanTweetsApp').controller('TweetRetweetCtrl', function (currentUserFactory, tweetsFactory, $scope, Restangular) {

  $scope.retweetTweet = function(tweetId) {
    if(currentUserFactory.isAuth) {

      var newRetweet = {
        username: $scope.loggedInUser
      };

      //PUT the newRetweet username into the tweet's retweets array
      tweetsFactory.retweets(tweetId).customPUT(newRetweet).then(function () {
        console.log('posted new retweet to: ' + tweetId);
      });

    }
  };

  $scope.removeRetweet = function(tweetId, retweetId) {

    //REMOVE retweet from the tweet's retweets array
    tweetsFactory.singleRetweet(tweetId, retweetId).remove().then(function(){ 
      console.log('removed retweet ' + retweetId + ' from tweet ' + tweetId);
    });

  };

});
