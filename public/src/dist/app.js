//var meanTweetsApp = angular.module('meanTweetsApp');

angular.module('meanTweetsApp', [
  'ngCookies',
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ui.router',
  'ui.router.title',
  'meanTweetsRoutes',
  'restangular',
  'angularMoment',
  'ngDialog',
  'angulartics', 
  'angulartics.google.analytics'
])

.config(function (authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider, ngDialogProvider, $analyticsProvider) {

  //disable angulartics for dev (also breaks unit tests)
  function angularticsDev(){
    $analyticsProvider.firstPageview(false);
  }

  //enable angulartics for prod
  function angularticsProd(){
    $analyticsProvider.firstPageview(true);
  }

  angularticsDev()



  //auth0 config
  authProvider.init({
    domain: 'ttbarnesmeanexample.auth0.com',
    clientID: 'w7iwHAmXIe34YoncwwoP2ivXAjGoTmqh',
    loginUrl: '/login'
  });

  //JWT/json web token config
  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  };

  //Simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  $httpProvider.interceptors.push('jwtInterceptor');

  ngDialogProvider.setDefaults({
    showClose: false
  });

})

.run(function ($rootScope, auth, store, jwtHelper, $location, Restangular, $state) {

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

  //for some reason, if the api sends a 404 from api/profiles/username/tweets
  //the promise doesn't return. Therefore $rootScope.restLoading is still loading 
  //and the public profile promise errors aren't honoured.
  //this ensures the 404 is honoured. Not the most elegant - require further investigation.
  Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
    if(response.status === 404) {
      $rootScope.restLoading = false;
      return true;
    }
  });

});