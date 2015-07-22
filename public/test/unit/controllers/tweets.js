describe('TweetsCtrl', function() {

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
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

      //prevents 'unexpected request: GET views/*/index.html' error
      httpBackend.whenGET(/views.*/).respond(200, '');

      var mockTweets = readJSON('test/unit/mock-data/tweets.json');

      httpBackend.whenGET('/api/profiles/undefined').respond(mockTweets);

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
        apiEndpointFactory : 'Restangular.all(\'api/profiles/\' + username );'
      };

      //controller specific mocks
      ctrl.profileUsername = state.params.username;

      //endPoint based on: it's timeline.
      //endPoint.route is what restangular returns.
      ctrl.endPoint = {
        route : tempApiRoutes.userProfile + currentUserFactory.username
      };

    });

  });

  
  
  /*
  describe('loggedInUser', function(){

    describe('when unauthorized', function(){

      beforeEach(function(){
        ctrl.loggedInUser = currentUserFactory.username;
      });

      it('should be defined', function(){
        expect(ctrl.loggedInUser).toBeDefined();
      });

      it('should match state params username ', function(){
        expect(ctrl.loggedInUser).toEqual(state.params.username);
      });

    });

    describe('when unauthorized', function(){

      beforeEach(function(){
        currentUserFactory = false;
      });

      it('should be false/undefined ', function(){
        expect(ctrl.loggedInUser).toBeFalsy();
      });

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

    beforeEach(function(){
      spyOn(Restangular, 'one').and.callThrough();
      scope.getTweets();
      httpBackend.flush();
    });

    it('should have a function', function(){
      expect(scope.getTweets).toBeDefined();
    });

    it('should return some tweets', function(){
      expect(scope.tweets[0]).toBeDefined();
      expect(scope.tweets[1]).toBeDefined();
      expect(scope.tweets[2]).toBeDefined();
    });

    it('should return tweet id fields', function(){
      expect(scope.tweets[0].id).toBeDefined();
      expect(scope.tweets[1].id).toBeDefined();
      expect(scope.tweets[2].id).toBeDefined();
    });

    it('should return tweet copy fields', function(){
      expect(scope.tweets[0].copy).toBeDefined();
      expect(scope.tweets[1].copy).toBeDefined();
      expect(scope.tweets[2].copy).toBeDefined();
      expect(scope.tweets[0].copy).not.toBe('');
      expect(scope.tweets[1].copy).not.toBe('');
      expect(scope.tweets[2].copy).not.toBe('');
    });

    it('should return tweet image/image url fields', function(){
      expect(scope.tweets[0].image).toBeDefined();
      expect(scope.tweets[0].image.url).toBeDefined();
      expect(scope.tweets[0].image.url).toContain('http://');
    });

    it('should return tweet favourites array', function(){
      expect(scope.tweets[0].favourites).toBeDefined();
      expect(scope.tweets[1].favourites).toBeDefined();
      expect(scope.tweets[2].favourites).toBeDefined();
    });

    it('should return tweet favourites array with nested objects', function(){
      expect(scope.tweets[0].favourites[0]).toBeDefined();
      expect(scope.tweets[1].favourites[0]).toBeDefined();
    });

    it('should return tweet favourites array with nested objects fields', function(){
      expect(scope.tweets[0].favourites[0].username).toBeTruthy();
      expect(scope.tweets[0].favourites[0].username).not.toBe('');
      expect(scope.tweets[0].favourites[0].id).toBeTruthy();
      expect(scope.tweets[0].favourites[0].id).not.toBe('');
    });

    it('should return tweet favourites array without nested objects', function(){
      expect(scope.tweets[2].favourites[0]).toBeFalsy();
    });

    it('should have undefined userNotTweeted', function() {
      expect(scope.userNotTweeted).toBeUndefined();
    });

  });

  */

});