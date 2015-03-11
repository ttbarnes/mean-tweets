angular.module('meanExampleApp').controller('TweetsCtrl', function ($scope, tweetsService) {

  $scope.tweets = tweetsService.tweets;

});
