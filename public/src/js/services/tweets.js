//usage eg:
//
//tweetsService.tweets.getList().then(function (tweets){ ... });
//
//tweetsService.search('someHashtag').getList().then(function (tweets){ ... });
//
//tweetsService.userSpecificTweets('support2').getList().then(function (tweets){ ... });
//
//tweetsService.singleTweet(5576b67fbb1c7b10c2dc65e1).getList().then(function (tweet){ ... });
//

angular.module('meanExampleApp').factory('tweetsService', function (Restangular){

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