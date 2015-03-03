angular.module('meanExampleApp').controller('TimelineCtrl', 
  function($scope, $http) {

    $scope.tagline = 'The square root of life is pi!';

    $http({ method: 'GET', url: 'api/bears' }).
      success(function(data, status, headers, config) {
        $scope.bears = data;
        console.log($scope.bears);
      });


});