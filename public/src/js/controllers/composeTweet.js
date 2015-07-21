angular.module('meanTweetsApp').controller('ComposeTweetCtrl', 
  function ($rootScope, $scope, Restangular, currentUserFactory, apiEndpointFactory, ngDialog) {

    $scope.postTweet = function(tweet){
      this.newTweet = {
        username: currentUserFactory.username,
        copy: tweet.copy,
        image:{
          url:((tweet.image) ? tweet.image.url : '')
        }
      };

      var newTweet = this.newTweet;

      apiEndpointFactory.tweets.post(newTweet).then(function(){
        console.info('posted a tweet', newTweet);
        $scope.tweet = '';
        ngDialog.closeAll();
        $rootScope.$broadcast('refreshTweets');
      });
    };

});