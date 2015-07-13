describe('TweetsCtrl', function() {

  //utils
  //apply "sanitizeRestangularOne" function to an array of items
  //extracted and adapted from: https://github.com/mgonto/restangular/issues/98

  function sanitizeRestangularAll(items) {
    var all = _.map(items, function (item) {
      return sanitizeRestangularOne(item);
    });
    return sanitizeRestangularOne(all);
  }

  //remove Restangular/AngularJS added methods in order to use Jasmine toEqual between the retrieve resource and the model
  function sanitizeRestangularOne(item) {
    return _.omit(item, "route", "parentResource", "getList", "get", "post", "put", "remove", "head", "trace", "options", "patch",
      "$get", "$save", "$query", "$remove", "$delete", "$put", "$post", "$head", "$trace", "$options", "$patch",
      "$then", "$resolved", "restangularCollection", "customOperation", "customGET", "customPOST",
      "customPUT", "customDELETE", "customGETLIST", "$getList", "$resolved", "restangularCollection", "one", "all", "doGET", "doPOST",
      "doPUT", "doDELETE", "doGETLIST", "addRestangularMethod", "getRestangularUrl", "getRequestedUrl", "clone", "reqParams",
      "withHttpConfig", "plain", "several", "oneUrl", "allUrl", "fromServer", "getParentList", "save");
  }

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      userProfileFactory = $injector.get('userProfileFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

      httpBackend.whenGET(/views.*/).respond(200, '');

      //httpBackend.expectGET('/api/profiles/undefined').respond({ hello: 'world'});
      

      ////////////
      //mocks
      ////////////

      //these will probably be shared helpers when we have more tests. 
      state.params = { username: 'steven' };

      currentUserFactory = {
        isAuth : true,
        username : state.params.username
      };

      tempApiRoutes = {
        userProfile : 'api/profiles/'
      };

      tempFactoryRestangularCalls = {
        userProfileFactory : 'Restangular.all(\'api/profiles/\' + username );'
      }

      //controller specific mocks
      ctrl.profileUsername = state.params.username;

      //endPoint based on: it's timeline.
      //endPoint.route is what restangular returns.
      ctrl.endPoint = {
        route : tempApiRoutes.userProfile + currentUserFactory.username
      };


    });

  });

  describe('apiRoute object', function(){

    it('should be defined', function(){
      expect(ctrl.apiRoute).toBeDefined();
    })

    it('should have correct tweets endpoint', function(){
      expect(ctrl.apiRoute.tweets).toBeDefined();
      expect(ctrl.apiRoute.tweets).toEqual('api/tweets/');
    });

    it('should have correct profiles endpoint', function(){
      expect(ctrl.apiRoute.profiles).toBeDefined();
      expect(ctrl.apiRoute.profiles).toEqual('api/profiles/');
    });

  });

  describe('profile username', function(){

    it('should have correct username', function(){
      expect(state.params.username).toBeDefined();
      expect(state.params.username).toEqual('steven');
    });

    it('should have the correct username in profileUsername', function(){
      expect(ctrl.profileUsername).toEqual(state.params.username);
    });

  });

  describe('apiEndpoint for currentUser', function(){

    it('should generate endPoint route that matches username in currentUserFactory', function(){
      expect(ctrl.endPoint.route).toEqual('api/profiles/' + currentUserFactory.username);
    });

  });

  describe('get tweets', function(){

    it('should have a function', function(){
      expect(scope.getTweets).toBeDefined();
    });

    it('should asdf adsfasdf dsf', function(){
      spyOn(Restangular, 'one').and.callThrough();
      httpBackend.whenGET('/api/profiles/undefined').respond([{ hello: 'world'},{ hi: 'everyone'}]);
      scope.getTweets();
      httpBackend.flush();

      expect(sanitizeRestangularAll(scope.tweets)).toEqual( 
          ({ 
             0: Object({ hello: 'world' }), 
             1: Object({ hi: 'everyone' })
          })
      );


    });

  });

});