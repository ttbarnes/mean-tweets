angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, $http) {

    $http({ method: 'GET', url: 'api/bears' }).
      success(function(data, status, headers, config) {
        $scope.bears = data;
        console.log($scope.bears);
      });


});