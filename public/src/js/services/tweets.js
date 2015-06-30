//usage eg:
//
//tweetsService.tweets.getList().then(function (tweets){ ... });
//
//tweetsService.search('someHashtag').getList().then(function (tweets){ ... });
//
//tweetsService.userSpecificTweets('support2').getList().then(function (tweets){ ... });
//

angular.module('meanExampleApp').factory('tweetsService', function (Restangular){

    return {
      tweets: Restangular.all('api/tweets'),
      search: function(searchQuery) {
        return Restangular.all('api/search/' + searchQuery);
      },
      userSpecificTweets: function(username) {
        return Restangular.all('api/profiles/' + username + '/tweets' );
      }
    }

  });