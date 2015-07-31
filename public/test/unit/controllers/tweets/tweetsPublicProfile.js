'use strict';

describe('TweetsCtrl - public profile context', function() {

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
      apiRoutes;

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
    httpBackend.whenGET('/' + apiRoutes.userTweets).respond(mockTweets); //jshint ignore:line

    ctrl.endPoint = apiRoutes.userTweets;
    spyOn(scope, 'getTweets');
    spyOn(Restangular, 'all').and.callThrough();
    httpBackend.flush();
    scope.$digest();

  });

  describe('after state check', function(){

    it('should have ProfilePublicCtrl as current controller', function(){
      expect(state.current.controller).toEqual(publicProfileCtrlName);
    });

    it('should declare true statePublicProfile', function (){
      expect(scope.statePublicProfile).toBeTruthy();
    });

    it('should generate the correct endpoint', function(){
      expect(ctrl.endPoint).toEqual('api/profiles/' + stateParams.username + '/tweets');
    });

  });

  describe('after initial api call', function(){

    it('should apply the data to scope', function(){
      expect(scope.tweets).toBeDefined();
    });

    it('should have some tweet objects', function(){
      expect(scope.tweets[0]).toBeDefined();
      expect(scope.tweets[1]).toBeDefined();
    });

    it('should have false userNotTweeted', function(){
      expect(scope.userNotTweeted).toBeFalsy();
    });

  });

});