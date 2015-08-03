'use strict';

describe('TweetsCtrl - timeline context', function() {

  var $q,
      scope,
      state,
      httpBackend,
      Restangular,
      currentUserFactory,
      ctrl,
      publicProfileUsername = 'steven',
      stateMock = {
        params: {
          username: publicProfileUsername
        },
        current: {
          controller: ''//home route/view is timeline context, there is no controller for this
        }
      },
      currentUserFollowingMock = 'userFollowing=ben&userFollowing=hellotest333&userFollowing=hellotest4444&userFollowing=wally', //this is generated inside the controller without scope 
      apiRoutesInit = {
        profiles: '/api/profiles/',
        timeline: '/api/timeline?' + currentUserFollowingMock
      };

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    module('meanTweetsApp', function ($provide){
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess); //jshint ignore:line
      $provide.value('$state', state = stateMock);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      ctrl = $controller('TweetsCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

    });

    httpBackend.whenGET(/views.*/).respond(200, '');

    httpBackend.whenGET(apiRoutesInit.profiles + currentUserFactory.username).respond(mockUser); //jshint ignore:line

    httpBackend.whenGET(apiRoutesInit.timeline).respond(mockTimelineTweets); //jshint ignore:line

    ctrl.initialEndPoint = {
      route : 'api/profiles/' + currentUserFactory.username
    };

    spyOn(scope, 'getTweets');
    spyOn(Restangular, 'all').and.callThrough();
    httpBackend.flush();
    scope.$digest();

  });

  describe('after state check', function(){

    it('should have false statePublicProfile', function (){
      expect(scope.statePublicProfile).toBeFalsy();
    });

    it('should generate the correct endpoint', function(){
      expect(ctrl.initialEndPoint.route).toEqual('api/profiles/' + currentUserFactory.username);
    });

  });

  describe('after initial api call', function(){

    it('should apply user data to scope', function(){
      expect(scope.currentUser).toBeDefined();
    });

    it('should have some user objects/fields', function(){
      expect(scope.currentUser.username).toBeDefined();
      expect(scope.currentUser.favourites).toBeDefined();
      expect(scope.currentUser.followers).toBeDefined();
      expect(scope.currentUser.following).toBeDefined();
    });

    it('should have false userNotTweeted', function(){
      expect(scope.userNotTweeted).toBeFalsy();
    });

    //todo: test customGET route (how?)

    describe('after timeline tweets are returned', function(){

      it('should have false userNoFollowings', function(){
        expect(scope.userNoFollowings).toBeFalsy();
      });

    });

  });

});