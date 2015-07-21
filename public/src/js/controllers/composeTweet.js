angular.module('meanTweetsApp').controller('ComposeTweetCtrl', 
  function ($rootScope, $scope, Restangular, currentUserFactory, apiEndpointFactory, ngDialog) {

    $scope.postTweet = function(tweet){

      $scope.loading = true;

      this.newTweet = {
        username: currentUserFactory.username,
        copy: tweet.copy,
        image:{
          url:((tweet.image) ? tweet.image.url : '')
        }
      };

      var newTweet = this.newTweet;

      apiEndpointFactory.tweets.post(newTweet).then(function(){
        $scope.loading = false;
        $scope.loadingSuccess = true;
        console.info('posted a tweet', newTweet);
        $scope.tweet = '';
        ngDialog.closeAll();
        $rootScope.$broadcast('refreshTweets');
      });
    };

});