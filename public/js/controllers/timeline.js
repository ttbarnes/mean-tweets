angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, Restangular) {

    var baseBears = Restangular.all('api/bears');

    baseBears.getList().then(function(bears) {
      $scope.bears = bears;
    });

    $scope.bears = baseBears.getList().$object;

    $scope.postTweet = function(tweet){

      var newTweet = {
        name: tweet.content
      };

      baseBears.post(newTweet);
    };



});