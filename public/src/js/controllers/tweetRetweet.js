angular.module('meanTweetsApp').controller('TweetRetweetCtrl', function (currentUserFactory, $scope, Restangular) {

  //todo: cleanup/re-use more - DRY
  this.apiRoute = {
    tweets   : 'api/tweets/',
    profiles : 'api/profiles/'
  }
  var apiRoute = this.apiRoute;

  $scope.retweetTweet = function(tweetId) {
    if(currentUserFactory.isAuth) {

      var url = {
        tweetId  : apiRoute.tweets + tweetId + '/retweets',
      }

      var newRetweet = {
        username: $scope.loggedInUser
      }

      //PUT the newRetweet username into the tweet's retweets array
      Restangular.all(url.tweetId).customPUT(newRetweet).then(function () {
        console.log('posted new retweet to: ' + url.tweetId);
      });

    }
  };

  $scope.removeRetweet = function(tweetId, retweetId) {

    var url = {
      tweetRetweetId  : apiRoute.tweets + tweetId + '/retweets/' + retweetId,
    }

    //REMOVE retweet from the tweet's retweets array
    Restangular.all(url.tweetRetweetId).remove().then(function(){ 
      console.log('removed retweet ' + retweetId + ' from tweet ' + tweetId);
    });

  };

});
