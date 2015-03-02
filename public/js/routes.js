angular.module('routes', []).config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
        templateUrl: '../views/home.html',
        controller: 'MainCtrl'
    })
    .when('/nerds', {
        templateUrl: '../views/nerd2.html',
        controller: 'NerdCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);