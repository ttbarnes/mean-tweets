angular.module('meanExampleRoutes', ['ui.router'])

  .constant('states', {
    home: {
      name: 'home'
    },
    nerds: {
      name: 'nerds'
    },
    geeks: {
      name: 'geeks'
    }
  })

  .config(function($stateProvider, $urlRouterProvider, states, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state(states.home.name, {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state(states.nerds.name, {
        url: '/nerds',
        templateUrl: 'views/nerd.html',
        controller: 'NerdCtrl'
      })
      .state(states.geeks.name, {
        url: '/geeks',
        templateUrl: 'views/geek.html',
        controller: 'GeekCtrl'
      })

    $locationProvider.html5Mode(true);


});