angular.module('meanTweetsApp').controller('ComposeTweetCtrl', 
  function ($rootScope, $scope, Restangular, currentUserFactory, tweetsFactory, ngDialog) {

    $scope.postTweet = function(tweet){
      this.newTweet = {
        username: currentUserFactory.username,
        copy: tweet.copy,
        image:{
          url:((tweet.image) ? tweet.image.url : '')
        }
      };

      var newTweet = this.newTweet;

      tweetsFactory.tweets.post(newTweet).then(function(){
        console.info('posted a tweet', newTweet);
        $scope.tweet = '';
        ngDialog.closeAll();
        $rootScope.$broadcast('refreshTweets');
      });
    };

});