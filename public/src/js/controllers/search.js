'use strict';

angular.module('meanTweetsApp').controller('SearchCtrl', 
  function ($rootScope, $scope, $stateParams, apiEndpointFactory) {

    $scope.doQuery = function(query){
      $scope.tweets = false;
      $scope.searchQuery = query;

      apiEndpointFactory.search(query).getList().then(function (data) {
        if(data.length) {
          $scope.noSearchResults = false;
          $scope.tweets = data;
        }
      }, function(){
        $scope.noSearchResults = true;
      });
    };

});