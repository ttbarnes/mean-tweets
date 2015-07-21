describe('ComposeTweetCtrl', function() {

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'wally'
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      rootScope = $injector.get('$rootScope').$new();
      scope = $injector.get('$rootScope').$new();
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

      //prevents 'unexpected request: GET views/*/index.html' error
      httpBackend.whenGET(/views.*/).respond(200, '');

      httpBackend.whenPOST('/api/tweets').respond(200, '');

      ctrl.mockTweet = {
        username: currentUserFactory.username,
        copy: 'tweet all the things',
        image:{
          url:'http://randomUrl.com/img.jpg'
        }
      };

      //spyOn(scope, '$broadcast');

    });

  });

  describe('initialization', function(){

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


      //why you no work
      /*
      it('should brodcast refreshTweets', function(){
        spyOn(rootScope, '$broadcast');
        expect(rootScope.$broadcast).toHaveBeenCalled();
      });
      */


    });

  });


});