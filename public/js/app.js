//var meanExampleApp = angular.module('meanExampleApp');

angular.module('meanExampleApp', [
  'ngCookies',
  'auth0',
  'ngRoute',
  'ui.router',
  'meanExampleRoutes',
  'restangular',
  'angular-storage',
  'angular-jwt'
])

.config(function (authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

  authProvider.init({
    domain: 'ttbarnesmeanexample.auth0.com',
    clientID: 'w7iwHAmXIe34YoncwwoP2ivXAjGoTmqh',
    loginUrl: '/login'
  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example
  $httpProvider.interceptors.push('jwtInterceptor');
})

.run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
});