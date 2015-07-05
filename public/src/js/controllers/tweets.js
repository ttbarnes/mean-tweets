angular.module('meanExampleApp').controller('TweetsCtrl', 
  function (currentUserFactory, $stateParams, $scope, Restangular, tweetsService) {

    //todo: improve error handling

    if(currentUserFactory.isAuth) {
      $scope.loggedInUser = currentUserFactory.username;
    }

    var apiRoute = {
      tweets   : 'api/tweets/',
      profiles : 'api/profiles/'
    }

    function getTweets() {

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
              tweet.usersFavId = favourites._id;
            }

          });

        });

      });

    };

    getTweets();

    $scope.postTweet = function(tweet){
      if(currentUserFactory.isAuth) {
        var newTweet = {
          username: currentUserFactory.username,
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
      if(currentUserFactory.isAuth) {

        var urls = {
          usernameInTweetFavs  : apiRoute.tweets + tweetId + '/favourites',
          tweetIdInProfileFavs : apiRoute.profiles + currentUserFactory.username + '/tweets/favourites/' + tweetId
        }

        var newFavourite = {
          username: $scope.loggedInUser
        }

        //PUT the newFavourite username into the tweet's favourite array
        Restangular.all(urls.usernameInTweetFavs).customPUT(newFavourite).then(function () {
          console.log('posted new favourite to: ' + urls.usernameInTweetFavs);
        });

        //PUT tweet id in loggedInUser's profile favourites object
        Restangular.all(urls.tweetIdInProfileFavs).customPUT(newFavourite).then(function () {
          console.log('posted new favourite tweet id to: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
        });

      }
    };

    $scope.unFavouriteTweet = function(tweetId, favouriteId) {
      if(currentUserFactory.isAuth) {

        //REMOVE the username's fav ID from the tweet's favourite array
        Restangular.all('api/tweets/' + tweetId + '/favourites/' + favouriteId).remove().then(function () {
          console.log('removed user from favourites: ' + 'api/tweets/' + tweetId + '/favourites/' + favouriteId);
        });

        //REMOVE the tweet ID from the user's profile favourites array
        Restangular.all('api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId).remove().then(function () {
          console.log('removed tweet from the users profile favourites: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
        });

      }
    };



});