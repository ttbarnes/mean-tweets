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


  it('should get the correct tweet id from state.params', function(){
    expect(ctrl.tweetId).toBeDefined();
    expect(ctrl.tweetId).toEqual(state.params.tweetId);
  });

  it('should have a get tweet function', function(){
    expect(scope.getTweet).toBeDefined();
  });

  it('should have called the get tweet function', function(){
    scope.$digest();
    spyOn(scope, 'getTweet');
    scope.getTweet();
    expect(scope.getTweet).toHaveBeenCalled();
    httpBackend.flush();
    expect(scope.tweet).toBeDefined();
  });

  it('should return some single tweet fields', function(){
    httpBackend.flush();
    expect(scope.tweet).toBeDefined();
    expect(scope.tweet.id).toBeDefined();
    expect(scope.tweet.copy).toBeDefined();
    expect(scope.tweet.image).toBeDefined();
    expect(scope.tweet.image.url).toBeDefined();
    expect(scope.tweet.favourites).toBeDefined();
    expect(scope.tweet.favourites[0].username).toBeTruthy();
    expect(scope.tweet.favourites[0].id).toBeTruthy();
  });

});