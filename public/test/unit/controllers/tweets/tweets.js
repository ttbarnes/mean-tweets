'use strict';

describe('TweetsCtrl - public profile and timeline context', function() {

  var $q,
      scope,
      state,
      stateParams,
      httpBackend,
      Restangular,
      currentUserFactory,
      ctrl,
      publicProfileCtrlName = 'ProfilePublicCtrl',
      publicProfileUsername = 'steven',
      stateParamsMock = {
        username: publicProfileUsername
      },
      stateMock = {
        current: {
          controller: publicProfileCtrlName
        }
      },
      apiRoutes,
      mockTweets;

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    module('meanTweetsApp', function ($provide){
      $provide.value('$state', state = stateMock);
      $provide.value('$stateParams', stateParams = stateParamsMock);
    }); 

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      stateParams = $injector.get('$stateParams');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $stateParams: stateParams,
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

    });

    apiRoutes = {
      userTweets: 'api/profiles/' + stateParams.username + '/tweets'
    };

    httpBackend.whenGET(/views.*/).respond(200, '');
    httpBackend.whenGET('/' + apiRoutes.userTweets).respond(mockTweets);

    ctrl.endPoint = apiRoutes.userTweets;
    spyOn(scope, 'currentUserTweetsCheck');
    spyOn(scope, 'getTweets');
    spyOn(Restangular, 'all').and.callThrough();
    httpBackend.flush();
    scope.$digest();

  });

  it('should instantiate the controller', function(){
    expect(ctrl).not.toBeUndefined();
  });

  describe('current user (if exists)', function(){

    it('should be assigned to scope', function(){
      expect(scope.loggedInUser).toBeDefined();
    });

    it('should equal currentUserFactory username', function(){
      expect(scope.loggedInUser).toEqual(currentUserFactory.username);
    });

    it('should have a currentUserTweetsCheck function', function(){
      expect(scope.currentUserTweetsCheck).toBeDefined();
    });

  });

  describe('getTweets function', function(){

    it('should be defined', function(){
      expect(scope.getTweets).toBeDefined();
    });

    it('should execute when called', function(){
      scope.getTweets();
      expect(scope.getTweets).toHaveBeenCalled();
    });

    describe('after timeline tweets are returned', function(){

      it('should call currentUserTweetsCheck', function(){
        expect(scope.currentUserTweetsCheck).toHaveBeenCalled();
      });

    });

  });

  //todo: test currentUserTweetsCheck specifics

});