//usage eg:
//
//userProfileFactory.user('support2')
//
//userProfileFactory.favourites('support2', '1a2b3c4d5e6f')
//

angular.module('meanTweetsApp').factory('userProfileFactory', function (Restangular){
    return {
      user: function(username) {
        return Restangular.all('api/profiles/' + username );
      },
      favourites: function(username, tweetId) {
        return Restangular.all('api/profiles/' + username + '/tweets/favourites/' + tweetId );
      }
    };

  });