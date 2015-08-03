'use strict';

describe('ComposeTweetCtrl', function() {

  var $q, 
      scope,
      httpBackend,
      Restangular,
      currentUserFactory,
      apiEndpointFactory,
      ctrl;

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('ComposeTweetCtrl', {
        $scope: scope,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory,
        apiEndpointFactory: apiEndpointFactory
      });

      httpBackend.expect('POST', '/api/tweets');

      httpBackend.whenGET(/views.*/).respond(200, '');

      httpBackend.whenPOST('/api/tweets').respond(200, '');

      ctrl.mockTweet = {
        username: currentUserFactory.username,
        copy: 'tweet all the things',
        image:{
          url:'http://randomUrl.com/img.jpg'
        }
      };

    });

  });

  describe('initialization', function(){

    it('should instantiate the controller', function(){
      expect(ctrl).not.toBeUndefined();
    });

    it('should have a postTweet function', function(){
      expect(scope.postTweet).toBeDefined();
    });

    it('should run postTweet when called', function(){
      spyOn(scope, 'postTweet');
      scope.postTweet(ctrl.mockTweet);
      expect(scope.postTweet).toHaveBeenCalled();
    });

  });

  describe('postTweet', function(){

    beforeEach(function(){
      scope.postTweet(ctrl.mockTweet);
      scope.$digest();
    });

    it('should have loading=true when post is not complete', function(){
      expect(scope.loading).toBeTruthy();
    });

    describe('object construction', function(){

      it('should get username field from param object and equal currentUserFactory username', function(){
        expect(scope.newTweet.username).toEqual(ctrl.mockTweet.username);
        expect(scope.newTweet.username).toEqual(currentUserFactory.username);
      });

      it('should get copy field from param object', function(){
        expect(scope.newTweet.copy).toEqual(ctrl.mockTweet.copy);
      });

      it('should get image url field from param object', function(){
        expect(scope.newTweet.image.url).toEqual(ctrl.mockTweet.image.url);
      });

    });

    describe('api call/promise success', function(){

      beforeEach(function(){
        spyOn(scope, '$broadcast');
        scope.postTweet(ctrl.mockTweet);
        httpBackend.flush();
        scope.$digest();
      });

      it('should have loading=false', function(){
        expect(scope.loading).toBeFalsy();
      });

      it('should have loadingSuccess=true', function(){
        expect(scope.loadingSuccess).toBeTruthy();
      });

      it('should clear scope tweet', function(){
        expect(scope.tweet).toEqual('');
      });

      it('should broadcast refreshTweets', function(){
        expect(scope.$broadcast).toHaveBeenCalledWith('refreshTweets');
      });

    });

  });

});