angular.module('meanExampleApp').controller('TweetsCtrl', 
  function (auth, $stateParams, $scope, Restangular, tweetsService) {

    $scope.loggedInUser = auth.profile.nickname;

    $scope.maxCharLength = 140;

    function getTweets() {
      //todo: handle errors

      tweetsService.tweets.getList().then(function (tweets){

        console.info('got new tweets');

        $scope.tweets = tweets;

        //for each tweet, check to see if any of the username fields (in favourites array)
        //equal $scope.loggedInUser.
        //if a match is found in one tweet,
        //add an extra field to the tweet: alreadyFavourited
        angular.forEach(tweets, function (tweet) {

          angular.forEach(tweet.favourites, function (favourites) {

              if(favourites.username === $scope.loggedInUser) {
                tweet.alreadyFavourited = true;
              }

          });

        });

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

        //PUT the newFavourite username into the tweet's favourite array
        Restangular.all('api/tweets/' + tweetId + '/favourites').customPUT(newFavourite).then(function () {
          console.log('posted new favourite to: ' + 'api/tweets/' + tweetId + '/favourites');
        });

        //PUT tweet id in loggedInUser's profile favourites object
        Restangular.all('api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId).customPUT(newFavourite).then(function () {
          console.log('posted new favourite tweet id to: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
        });

      }
    };

    $scope.unFavouriteTweet = function(tweetId) {
      console.log('todo: unfavouriteTweet');
      if(auth.isAuthenticated) {

        var newUnfavourite = {
          username: $scope.loggedInUser
        }


        //REMOVE the newUnfavourite username/object from the tweet's favourite array

        //REMOVE tweet id in loggedInUser's profile favourites object
      }

    };



});