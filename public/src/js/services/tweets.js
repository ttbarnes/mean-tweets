angular.module('meanExampleApp').factory('tweetsService', function (Restangular){

    var factory = {};

    (function getAllTweets(){
      baseTweets = Restangular.all('api/tweets');
    })();

    baseTweets.getList().then(function(tweets) {
      factory.tweets = tweets;
    });

    function tweetsObject() { 
      factory.tweets = baseTweets.getList().$object;
    };

    //setInterval(tweetsObject, 10000);
    tweetsObject();

    return factory;

  });