angular.module('meanExampleRoutes', ['ui.router'])

  .constant('states', {
    home: {
      name: 'home'
    },
    notifications: {
      name: 'notifications'
    },
    profile: {
      name: 'profile'
    },
    login: {
      name: 'login'
    },
    logout: {
      name: 'logout'
    }
  })

  .config(function($stateProvider, $urlRouterProvider, states, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state(states.home.name, {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state(states.notifications.name, {
        url: '/notifications',
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl'
      })
      .state(states.profile.name, {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state(states.login.name, {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state(states.logout.name, {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })

    $locationProvider.html5Mode(true);


});