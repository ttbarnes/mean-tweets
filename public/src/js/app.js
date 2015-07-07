//var meanExampleApp = angular.module('meanExampleApp');

angular.module('meanExampleApp', [
  'ngCookies',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ngRoute',
  'ui.router',
  'ui.router.title',
  'meanExampleRoutes',
  'restangular',
  'angularMoment',
  'ngDialog'
])

.config(function (authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider, ngDialogProvider) {

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

  ngDialogProvider.setDefaults({
    showClose: false
  });

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
        else {
          $location.path('/');
        }
      }
    }
  });

  //restangular inerceptors
  //show/hide loading indicator
  Restangular.addRequestInterceptor(function (element) {
    $rootScope.restLoading = true;
    return element;
  });

  Restangular.addResponseInterceptor(function (data) {
    $rootScope.restLoading = false;
    return data;
  });


});