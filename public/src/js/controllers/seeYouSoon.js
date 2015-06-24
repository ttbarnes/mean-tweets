angular.module('meanExampleApp').controller('SeeYouSoonCtrl', function ($timeout, $state) {

  var seconds = 5000;

  $timeout(function(){
    console.log('ok...');
    $state.go('home');
  }, seconds);

});