angular.module('meanExampleRoutes', ['ui.router'])

  .constant('states', {
    home: {
      name: 'home',
      pageTitle: 'Home'
    },
    search: {
      name: 'search',
      pageTitle: 'Search'
    },
    notifications: {
      name: 'notifications',
      pageTitle: 'Notifications'
    },
    profileEdit: {
      name: 'profileEdit',
      pageTitle: 'Edit Profile'
    },
    profilePublic: {
      name: 'profilePublic',
      pageTitle: 'Temp page title'
    },
    login: {
      name: 'login',
      pageTitle: 'Login'
    },
    logout: {
      name: 'logout',
      pageTitle: 'Logout'
    },
    seeYouSoon: {
      name: 'seeYouSoon',
      pageTitle: 'See you soon'
    },
    error: {
      name: 'error',
      pageTitle: 'Error'
    },
    loginRequired: {
      name: 'loginRequired',
      pageTitle: 'Login required'
    }
  })

  .config(function($stateProvider, $urlRouterProvider, states, $locationProvider) {

    $urlRouterProvider.otherwise('/error');

    $stateProvider
      .state(states.home.name, {
        url: '/',
        templateUrl: 'views/home/index.html',
        resolve: {
          $title: function() { return states.home.pageTitle; }
        }
      })
      .state(states.login.name, {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        resolve: {
          $title: function() { return states.login.pageTitle; }
        }
      })
      .state(states.search.name, {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        resolve: {
          $title: function() { return states.search.pageTitle; }
        }
      })
      .state(states.profilePublic.name, {
        url: '/profiles/:username',
        templateUrl: 'views/profile-public.html',
        controller: 'ProfilePublicCtrl',
        resolve: {
          $title: function() { return states.profilePublic.pageTitle; }
        }
      })
      .state(states.profileEdit.name, {
        url: '/edit-profile',
        templateUrl: 'views/profile-edit.html',
        controller: 'ProfileCtrl',
        data: {
          'auth': {
            required: true
          }
        },
        resolve: {
          $title: function() { return states.profileEdit.pageTitle; }
        }
      })
      .state(states.notifications.name, {
        url: '/notifications',
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl',
        resolve: {
          $title: function() { return states.notifications.pageTitle; }
        }
      })
      .state(states.logout.name, {
        url: '/logout',
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        resolve: {
          $title: function() { return states.logout.pageTitle; }
        }
      })
      .state(states.seeYouSoon.name, {
        url: '/see-you-soon',
        templateUrl: 'views/see-you-soon.html',
        controller: 'SeeYouSoonCtrl',
        resolve: {
          $title: function() { return states.seeYouSoon.pageTitle; }
        }
      })
      .state(states.error.name, {
        url: '/error',
        templateUrl: 'views/error.html',
        resolve: {
          $title: function() { return states.error.pageTitle; }
        }
      })
      .state(states.loginRequired.name, {
        url: '/login-required',
        templateUrl: 'views/login-required.html',
        resolve: {
          $title: function() { return states.loginRequired.pageTitle; }
        }
      })
 
    $locationProvider.html5Mode(true);


});