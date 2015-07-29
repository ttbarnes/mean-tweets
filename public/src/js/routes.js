angular.module('meanTweetsRoutes', ['ui.router'])

  .constant('states', {
    home: {
      name: 'home',
      pageTitle: 'Home'
    },
    tweetSingle: {
      name: 'tweetSingle',
      pageTitle: 'Tweet'
    },
    search: {
      name: 'search',
      pageTitle: 'Search'
    },
    profileEdit: {
      name: 'profileEdit',
      pageTitle: 'Edit Profile'
    },
    profilePublic: {
      name: 'profilePublic'
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
      .state(states.tweetSingle.name, {
        url: '/tweets/:tweetId',
        templateUrl: 'views/tweet-single.html',
        controller: 'TweetSingleCtrl',
        resolve: {
          $title: function() { return states.tweetSingle.pageTitle; }
        }
      })
      .state(states.search.name, {
        url: '/search/:searchParam',
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        resolve: {
          searchResults: function(Restangular, $stateParams) {
            return Restangular.all('api/search/' + $stateParams.searchParam ).getList().then(function (data) {
              var searchResults = {
                success: true,
                data: data
              };
              return searchResults;

            }, function () {
              console.warn('no search results found with the query ' + $stateParams.searchParam);
              var searchResults = {
                success: false
              };
              return searchResults;
            });
          },
          $title: function() { return states.search.pageTitle; }
        }
      })
      .state(states.profilePublic.name, {
        url: '/profiles/:username',
        templateUrl: 'views/profile/public.html',
        controller: 'ProfilePublicCtrl',
        resolve: {
          profileUsernameData: function(Restangular, $stateParams){
            return Restangular.all('api/profiles/' + $stateParams.username ).getList().then(function (profile) {

              var theResponse = {
                success: true,
                profile: profile[0]
              };
              return theResponse;

              }, function () {
                console.warn('no user ' + $stateParams.username + ' exists.');
                var theResponse = {
                  success: false
                };
                return theResponse;
              });
          },
          $title: ['$stateParams', function($stateParams) {
            return $stateParams.username;
          }]
        }
      })
      .state(states.profileEdit.name, {
        url: '/edit-profile',
        templateUrl: 'views/profile/edit.html',
        controller: 'ProfileEditCtrl',
        data: {
          'auth': {
            required: true
          }
        },
        resolve: {
          $title: function() { return states.profileEdit.pageTitle; }
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
      });
 
    $locationProvider.html5Mode(true);


});