angular.module('meanTweetsApp').controller('PostTweetCtrl', 
  function ($rootScope, $scope, Restangular, currentUserFactory, tweetsFactory, ngDialog) {

    $scope.postTweet = function(tweet){
      if(currentUserFactory.isAuth) {
        var newTweet = {
          username: currentUserFactory.username,
          copy: tweet.copy,
          image:{
            url:((tweet.image) ? tweet.image.url : '')
          }
        };

        tweetsFactory.tweets.post(newTweet).then(function(){
          console.info('posted a tweet', newTweet);
          $scope.tweet = '';
          ngDialog.closeAll();
          $rootScope.$broadcast('refreshTweets');
        });
      }
      else {
        console.error('unable to post tweet - user is not authenticated.');
      }
    };

});