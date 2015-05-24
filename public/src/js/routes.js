angular.module('meanExampleRoutes', ['ui.router'])

  .constant('states', {
    tweets: {
      name: 'tweets'
    },
    notifications: {
      name: 'notifications'
    },
    profile: {
      name: 'profile'
    },
    logout: {
      name: 'logout'
    },
    login: {
      name: 'login'
    }
  })

  .config(function($stateProvider, $urlRouterProvider, states, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state(states.tweets.name, {
        url: '/',
        templateUrl: 'views/tweets.html',
        controller: 'TweetsCtrl'
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
      .state(states.logout.name, {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .state(states.login.name, {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

    $locationProvider.html5Mode(true);


});