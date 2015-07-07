angular.module('meanExampleApp').controller('PostTweetCtrl', 
  function ($scope, Restangular, currentUserFactory, tweetsFactory, ngDialog) {

    $scope.postTweet = function(tweet){
      console.log('cliked postTweet!');
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
          //getTweets();
        });
      }
      else {
        console.error('unable to post tweet - user is not authenticated');
      }
    };

});