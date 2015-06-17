angular.module('meanExampleApp').controller('SearchCtrl', 
  function ($scope, Restangular, tweetsService) {

    var searchstring = 'taken3';

    function getTweets() {
      //todo: handle errors
      tweetsService.search(searchstring).getList().then(function (tweets){
        $scope.tweets = tweets;

        console.info('got new tweets');

      });
    };

    getTweets();

});