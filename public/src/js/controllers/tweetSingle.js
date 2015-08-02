'use strict';

angular.module('meanTweetsApp').controller('TweetSingleCtrl', 
  function ($stateParams, $scope, Restangular, apiEndpointFactory) {

    $scope.singleTweet = true;

    this.tweetId = $stateParams.tweetId;
    var tweetId = this.tweetId;

    $scope.getTweet = function() {
      //todo: handle errors
      apiEndpointFactory.singleTweet(tweetId).get().then(function (tweet){
        $scope.tweet = tweet;
        console.info('got the tweet');
      }, function (err){
        console.warn('oh no, tweet could not be found! details: \n', err);
        $scope.tweetNotFound = true;
      });
    };

    $scope.getTweet();

});