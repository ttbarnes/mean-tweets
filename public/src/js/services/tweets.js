//usage eg:
//
//tweetsService.tweetsTest.getList().then(function (tweets){ ... });
//
//tweetsService.userSpecificTweets('support2').getList().then(function (tweets){ ... });
//

angular.module('meanExampleApp').factory('tweetsService', function (Restangular){

    return {
      tweets: Restangular.all('api/tweets'),
      search: function(searchstring) {
        return Restangular.all('api/search/' + searchstring);
      },
      userSpecificTweets: function(username) {
        return Restangular.all('api/tweets/' + username);
      }
    }

  });