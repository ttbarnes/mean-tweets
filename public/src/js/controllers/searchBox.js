angular.module('meanTweetsApp').controller('SearchBoxCtrl', function ($scope) {


  $scope.$on('searchCompleted', function() {
    console.log('the search');
    console.info('clearing search input');
    $scope.search.query = '';
  });


});