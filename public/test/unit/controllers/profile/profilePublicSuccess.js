'use strict';

describe('ProfilePublicCtrl - success: user found', function() {

  var $q,
      scope,
      httpBackend,
      state = {
        params: [{
          username: 'steven'
        }]
      },
      Restangular,
      currentUserFactory,
      apiEndpointFactory,
      ctrl,
      stateParamsUsername = state.params[0].username,
      currentUserUsername = 'wally',
      profileUsernameDataMockSuccess = {
        profile: [{
          details: [{
            _id: '1234',
            about: 'I love tweeting about things',
            location: 'Sometimes even I do not know',
            websiteUrl: 'http://whereswally.com'
          }],
          favourites: [],
          followers: [],
          following: []
        }],
        username: currentUserUsername,
        success: true
      },
      tweetIdMock = 'b456789akIJmnHJNkmQIk24449',
      ngDialog;

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    module('meanTweetsApp', function ($provide) {
      $provide.value('profileUsernameData', profileUsernameDataMockSuccess = profileUsernameDataMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      state = $injector.get('$state');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      
      ngDialog = {
        open: jasmine.createSpy('ngDialog.open').and.callThrough()
      };

      ctrl = $controller('ProfilePublicCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory,
        ngDialog: ngDialog
      });

      scope.loggedInUser = currentUserFactory.username;

      scope.profileUsername = stateParamsUsername; //profileUsername is the public profile.

      httpBackend.whenGET(/views.*/).respond(200, '');

      httpBackend.whenGET('/api/profiles/undefined/tweets').respond(mockTweets); //jshint ignore:line

    });

  });

  describe('tweets count', function(){

    beforeEach(function(){
      spyOn(Restangular, 'all').and.callThrough();
      httpBackend.flush();
      scope.$digest();
    });

    it('should generate the correct route', function(){
      expect(apiEndpointFactory.userTweets(scope.profileUsername).route).toEqual('api/profiles/' + scope.profileUsername + '/tweets');
    });

    it('sla dlk sldfkj klsdf jksfd', function(){
      expect(scope.tweetsCount).toBeDefined();
      expect(scope.tweetsCount).toEqual(jasmine.any(Number));
    });

  });

  it('should apply currentUserFactory.username to scope', function(){
    expect(scope.loggedInUser).toEqual(currentUserFactory.username);
  });

  describe('delete tweet', function(){

    beforeEach(function(){
      spyOn(scope, 'deleteTweetDialog').and.callThrough();
    });

    it('should have a deleteTweetDialog function defined', function(){
      expect(scope.deleteTweetDialog).toBeDefined();
    });
    
    it('should call deleteTweetDialog function when called', function(){
      scope.deleteTweetDialog(tweetIdMock);
      expect(scope.deleteTweetDialog).toHaveBeenCalledWith(tweetIdMock);
    });

    describe('ngDialog', function(){

      it('should have been called with open method', function(){
        scope.deleteTweetDialog(tweetIdMock);
        expect(ngDialog.open).toHaveBeenCalled();
      });

    });

  });

});