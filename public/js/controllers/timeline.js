angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, Restangular) {

    var bears = Restangular.all('api/bears');

    bears.getList().then(function(bears) {
      $scope.bears = bears;
    });



});