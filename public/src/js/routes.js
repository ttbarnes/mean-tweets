angular.module('meanExampleRoutes', ['ui.router'])

  .constant('states', {
    home: {
      name: 'home'
    },
    search: {
      name: 'search'
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
    },
    seeYouSoon: {
      name: 'seeYouSoon'
    },
    error: {
      name: 'error'
    }
  })

  .config(function($stateProvider, $urlRouterProvider, states, $locationProvider) {

    $urlRouterProvider.otherwise('/error');

    $stateProvider
      .state(states.home.name, {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state(states.search.name, {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
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
      .state(states.seeYouSoon.name, {
        url: '/see-you-soon',
        templateUrl: 'views/see-you-soon.html'
      })
      .state(states.error.name, {
        url: '/error',
        templateUrl: 'views/error.html'
      })

    $locationProvider.html5Mode(true);


});