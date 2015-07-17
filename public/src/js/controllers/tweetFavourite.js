angular.module('meanTweetsApp').controller('TweetFavouriteCtrl', function (currentUserFactory, $scope, Restangular) {

  //todo: cleanup/re-use more - DRY
  this.apiRoute = {
    tweets   : 'api/tweets/',
    profiles : 'api/profiles/'
  }
  var apiRoute = this.apiRoute;

  $scope.favouriteTweet = function(tweetId) {
    if(currentUserFactory.isAuth) {

      var urls = {
        usernameTweetFavs  : apiRoute.tweets + tweetId + '/favourites',
        tweetIdProfileFavs : apiRoute.profiles + currentUserFactory.username + '/tweets/favourites/' + tweetId
      }

      var newFavourite = {
        username: $scope.loggedInUser
      }

      //PUT the newFavourite username into the tweet's favourite array
      Restangular.all(urls.usernameTweetFavs).customPUT(newFavourite).then(function () {
        console.log('posted new favourite to: ' + urls.usernameTweetFavs);
      });

      //PUT tweet id in loggedInUser's profile favourites object
      Restangular.all(urls.tweetIdProfileFavs).customPUT(newFavourite).then(function () {
        console.log('posted new favourite tweet id to: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
      });

    }
  };

  $scope.unFavouriteTweet = function(tweetId, favouriteId) {
    if(currentUserFactory.isAuth) {

      var urls = {
        usernameTweetFavId : apiRoute.tweets + tweetId + '/favourites/' + favouriteId,
        tweetIdProfileFav  : apiRoute.profiles + currentUserFactory.username + '/tweets/favourites/' + tweetId
      }

      //REMOVE the username's fav ID from the tweet's favourite array
      Restangular.all(urls.usernameTweetFavId).remove().then(function () {
        console.log('removed user from favourites: ' + urls.usernameTweetFavId);
      });

      //REMOVE the tweet ID from the user's profile favourites array
      Restangular.all(urls.tweetIdProfileFav).remove().then(function () {
        console.log('removed tweet from the users profile favourites: ' + 'api/profiles/' + $scope.loggedInUser + '/tweets/favourites/' + tweetId);
      });

    }
  };

});
