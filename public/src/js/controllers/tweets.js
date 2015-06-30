angular.module('meanExampleApp').controller('TweetsCtrl', 
  function (auth, $stateParams, $scope, Restangular, tweetsService) {

    $scope.loggedInUser = auth.profile.nickname;

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




    $scope.favouriteTweet = function(tweetId) {
      if(auth.isAuthenticated) {

        var newFavourite = {
          username: $scope.loggedInUser
        }

        Restangular.all('api/tweets/' + tweetId + '/favourites').customPUT(newFavourite).then(function () {
          console.log('posted new favourite to: ' + 'api/tweets/' + tweetId + '/favourites');
        });


      }

    };









});