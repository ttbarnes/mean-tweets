//var meanExampleApp = angular.module('meanExampleApp');

angular.module('meanExampleApp', [
  'ngCookies',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ngRoute',
  'ui.router',
  'meanExampleRoutes',
  'restangular'
])

.config(function (authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

  //auth0 config
  authProvider.init({
    domain: 'ttbarnesmeanexample.auth0.com',
    clientID: 'w7iwHAmXIe34YoncwwoP2ivXAjGoTmqh',
    loginUrl: '/login'
  });

  //JWT/json web token config
  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }

  //Simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  $httpProvider.interceptors.push('jwtInterceptor');


})

.run(function ($rootScope, auth, store, jwtHelper, $location, Restangular) {

  //auth
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } 
        /*
        else {
          $location.path('/login');
        }
        */
      }
    }
  });

  //restangular inerceptor 
  //allows us to show a loading indicator
  Restangular.addRequestInterceptor(function(element) {
    $rootScope.loadingTweets = true;
    return element;
  });
  Restangular.addResponseInterceptor(function(data) {
    $rootScope.loadingTweets = false;
    return data;
  });


});