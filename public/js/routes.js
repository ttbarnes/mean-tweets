angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
        templateUrl: '../views/home.html',
        controller: 'MainCtrl'
    })
    .when('/nerds', {
        templateUrl: '../views/nerd.html',
        controller: 'NerdController'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);