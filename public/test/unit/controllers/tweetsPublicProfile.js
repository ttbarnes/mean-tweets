describe('TweetsCtrl - public profile context', function() {

  var publicProfileCtrlName = 'ProfilePublicCtrl';
  var publicProfileUsername = 'steven';

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'wally'
  };

  var stateMock = {
    params: {
      username: publicProfileUsername
    },
    current: {
      controller: publicProfileCtrlName
    }
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide){
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
      $provide.value('$state', state = stateMock);
    }); 

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state')
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory,
        apiEndpointFactory: apiEndpointFactory
      });

      httpBackend.whenGET(/views.*/).respond(200, '');

      var mockTweets = readJSON('test/unit/mock-data/tweets.json');

      httpBackend.whenGET('/api/profiles/' + currentUserFactory.username).respond(mockTweets);

      scope.$digest();

    });

  });

  describe('initialization', function(){

    describe('current user (if exists)', function(){
      
      it('should be assigned to scope', function(){
        expect(scope.loggedInUser).toBeDefined();
      });

      it('should equal currentUserFactory username', function(){
        expect(scope.loggedInUser).toEqual(currentUserFactory.username);
      });

    });

    //check currentUserTweetsCheck?
    //change to scope.currentUserTweetsCheck ?
    //expect(ctrl.currentUserTweetsCheck).toBeDefined();

    describe('state check', function(){

      it('should have ProfilePublicCtrl as current controller', function(){
        expect(state.current.controller).toEqual(publicProfileCtrlName);
      });

      it('should declare true statePublicProfile', function (){
        expect(scope.statePublicProfile).toBeTruthy();
      });

    });

  });

});