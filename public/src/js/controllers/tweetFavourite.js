angular.module('meanTweetsApp').controller('TweetFavouriteCtrl', function (currentUserFactory, apiEndpointFactory, $scope) {

  $scope.favouriteTweet = function(tweetId) {

    var newFavourite = {
      username: currentUserFactory.username
    };

    //PUT the newFavourite username into the tweet's favourite array
    apiEndpointFactory.favourites(tweetId).customPUT(newFavourite).then(function () {
      console.log('posted new favourite tweet: ' + tweetId);
    });

    //PUT tweet id in loggedInUser's profile favourites object
    apiEndpointFactory.userFavourites(currentUserFactory.username, tweetId).customPUT(newFavourite).then(function () {
      console.log('posted new favourite tweet to ' + currentUserFactory.username + '\'s profile');
    });

  };

  $scope.unFavouriteTweet = function(tweetId, favouriteId) {

    //REMOVE the username's fav ID from the tweet's favourite array
    apiEndpointFactory.singleFavourite(tweetId, favouriteId).remove().then(function () {
      console.log('removed user\'s favourite tweet from the tweet: ' + tweetId);
    });

    //REMOVE the tweet ID from the user's profile favourites array
    apiEndpointFactory.userFavourites(currentUserFactory.username, tweetId).remove().then(function () {
      console.log('removed favourite tweet from ' + currentUserFactory.username + '\'s profile' );
    });

  };

});
