//usage eg:
//
//tweetsFactory.tweets.getList()
//
//tweetsFactory.search('someHashtag').getList()
//
//tweetsFactory.userSpecificTweets('support2')
//
//tweetsFactory.singleTweet(5576b67fbb1c7b10c2dc65e1)
//
//tweetsFactory.favourites(4486b67fbb1c7b10c2dc6C0a)
//
//tweetsFactory.singleFavouite(5576b67fbb1c7b10c2dc65e1, 4486b67fbb1c7b10c2dc6C0a)
//

angular.module('meanTweetsApp').factory('tweetsFactory', function (Restangular){

    return {
      tweets: Restangular.all('api/tweets'),

      timeline: function(userFollowing) {
        return Restangular.all('api/').customGET('tweetsTimeline',  userFollowing);
      },

      search: function(searchQuery) {
        return Restangular.all('api/search/' + searchQuery);
      },

      userSpecificTweets: function(username) {
        return Restangular.all('api/profiles/' + username + '/tweets' );
      },

      singleTweet: function(tweetId) {
        return Restangular.one('api/tweets/' + tweetId);
      },
      favourites: function(tweetId) {
        return Restangular.one('api/tweets/' + tweetId + '/favourites');
      },
      singleFavourite: function(tweetId, favouriteId) {
        return Restangular.one('api/tweets/' + tweetId + '/favourites/' + favouriteId);
      }

    }

  });