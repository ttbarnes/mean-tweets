//usage eg:
//
//tweetsFactory.tweets.getList().then(function (tweets){ ... });
//
//tweetsFactory.search('someHashtag').getList().then(function (tweets){ ... });
//
//tweetsFactory.userSpecificTweets('support2').getList().then(function (tweets){ ... });
//
//tweetsFactory.singleTweet(5576b67fbb1c7b10c2dc65e1).getList().then(function (tweet){ ... });
//

angular.module('meanExampleApp').factory('tweetsFactory', function (Restangular){

    return {
      tweets: Restangular.all('api/tweets'),
      search: function(searchQuery) {
        return Restangular.all('api/search/' + searchQuery);
      },
      userSpecificTweets: function(username) {
        return Restangular.all('api/profiles/' + username + '/tweets' );
      },
      singleTweet: function(tweetId) {
        return Restangular.one('api/tweets/' + tweetId);
      }

    }

  });