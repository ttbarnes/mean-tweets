angular.module('meanExampleApp').controller('TweetsCtrl', 
  function (auth, $scope, Restangular, tweetsService) {

    $scope.maxCharLength = 140;

    function getTweets() {
      //todo: handle errors
      tweetsService.tweets.getList().then(function (tweets){
        $scope.tweets = tweets;

        console.info('got new tweets');
      });
    };

    getTweets();

    $scope.postTweet = function(tweet){
      if(auth.isAuthenticated) {
        var newTweet = {
          username: auth.profile.nickname,
          copy: tweet.copy,
          image:{
            url:((tweet.image) ? tweet.image.url : '')
          }
        };

        tweetsService.tweets.post(newTweet).then(function(){
          console.info('posted a tweet', newTweet);
          $scope.tweet = '';
        });

        getTweets();
      }
      else {
        console.error('unable to post tweet - user is not authenticated');
      }
    };

});