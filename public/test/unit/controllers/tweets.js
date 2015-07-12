describe('TweetsCtrl', function() {

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      currentUserFactory = $injector.get('currentUserFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $state: state,
        currentUserFactory: currentUserFactory
      });

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

});