angular.module('meanTweetsApp').factory('apiEndpointFactory', function (Restangular){

    return {

      tweets: Restangular.all('api/tweets'),

      singleTweet: function(tweetId) {
        return Restangular.one('api/tweets/' + tweetId);
      },

      favourites: function(tweetId) {
        return Restangular.one('api/tweets/' + tweetId + '/favourites');
      },

      singleFavourite: function(tweetId, favouriteId) {
        return Restangular.one('api/tweets/' + tweetId + '/favourites/' + favouriteId);
      },

      retweets: function(tweetId) {
        return Restangular.one('api/tweets/' + tweetId + '/retweets');
      },

      singleRetweet: function(tweetId, retweetId) {
        return Restangular.one('api/tweets/' + tweetId + '/retweets/' + retweetId);
      },

      timeline: function(userFollowing) {
        return Restangular.all('api/').customGET('timeline',  userFollowing);
      },

      search: function(searchQuery) {
        return Restangular.all('api/search/' + searchQuery);
      },

      user: function(username) {
        return Restangular.all('api/profiles/' + username );
      },

      userTweets: function(username) {
        return Restangular.all('api/profiles/' + username + '/tweets' );
      },

      userDetails: function(username) {
        return Restangular.all('api/profiles/' + username + '/details' );
      },

      userFavourites: function(username, tweetId) {
        return Restangular.all('api/profiles/' + username + '/tweets/favourites/' + tweetId );
      },

      userFollowing: function(username) {
        return Restangular.all('api/profiles/' + username + '/following');
      },

      userFollowers: function(username) {
        return Restangular.all('api/profiles/' + username + '/followers');
      }

    };

  });