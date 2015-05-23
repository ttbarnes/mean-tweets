angular.module('meanExampleApp').controller('TweetsCtrl', 
  function (auth, $scope, Restangular, tweetsService) {

    $scope.maxCharLength = 140;

    tweetsService.tweets.getList().then(function (tweets){
      $scope.tweets = tweets;
    });

    $scope.postTweet = function(tweet){
      if(auth.isAuthenticated) {
        var newTweet = {
          name: tweet.content,
          username: auth.profile.nickname
        };

        tweetsService.tweets.post(newTweet).then(function(){
          console.info('posted a tweet', newTweet);
          //todo: clear the form input
        });

        //todo: handle errors

        tweetsService.tweets.getList().then(function (tweets){
          $scope.tweets = tweets;
          console.info('got new tweets');
        });
      }
      else {
        console.error('unable to post tweet - user is not authenticated');
      }

    };

});