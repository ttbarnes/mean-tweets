'use strict';

describe('TweetSingleCtrl', function() {

  var $q,
      scope,
      state,
      httpBackend,
      Restangular,
      ctrl;

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      ctrl = $controller('TweetSingleCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend
      });

      httpBackend.whenGET(/views.*/).respond(200, '');

      httpBackend.whenGET('/api/tweets/undefined').respond(mockSingleTweet); //jshint ignore:line

      state.params = { tweetId: '00001' };

      ctrl.tweetId = state.params.tweetId;

    });

  });

  it('should instantiate the controller', function(){
    expect(ctrl).not.toBeUndefined();
  });

  it('should have true singleTweet in scope', function(){
    expect(scope.singleTweet).toBeTruthy();
  });

  it('should get the correct tweet id from state.params', function(){
    expect(ctrl.tweetId).toBeDefined();
    expect(ctrl.tweetId).toEqual(state.params.tweetId);
  });

  it('should have a getTweet function', function(){
    expect(scope.getTweet).toBeDefined();
  });

  it('should run getTweet when called', function(){
    spyOn(scope, 'getTweet');
    scope.getTweet();
    expect(scope.getTweet).toHaveBeenCalled();
  });

  it('should have called the get tweet function', function(){
    scope.$digest();
    spyOn(scope, 'getTweet');
    scope.getTweet();
    expect(scope.getTweet).toHaveBeenCalled();
    httpBackend.flush();
    expect(scope.tweet).toBeDefined();
  });

  describe('tweet fields', function(){

    beforeEach(function(){
      httpBackend.flush();
    });

    it('should have tweet', function(){
      expect(scope.tweet).toBeDefined();
    });

    it('should have id', function(){
      expect(scope.tweet.id).toBeDefined();
    });

    it('should have copy', function(){
      expect(scope.tweet.copy).toBeDefined();
    });

    it('should have image', function(){
      expect(scope.tweet.image).toBeDefined();
      expect(scope.tweet.image.url).toBeDefined();
    });

    it('should have favourites', function(){
      expect(scope.tweet.favourites).toBeDefined();
    });

    it('should have favourites username', function(){
      expect(scope.tweet.favourites[0].username).toBeTruthy();
    });

    it('should have favourites id', function(){
      expect(scope.tweet.favourites[0].id).toBeTruthy();
    });

    it('should have retweets', function(){
      expect(scope.tweet.retweets).toBeDefined();
    });

    it('should have retweets username', function(){
      expect(scope.tweet.retweets[0].username).toBeTruthy();
    });

    it('should have retweets id', function(){
      expect(scope.tweet.retweets[0].id).toBeTruthy();
    });

  });

});