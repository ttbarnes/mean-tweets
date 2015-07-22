describe('DeleteTweetCtrl', function() {

  var $q;
  var scope;
  var ctrl;
  var tweetIdMock = 'b456789akIJmnHJNkmQIk24449';

  beforeEach(function() {
    module('meanTweetsApp', function ($provide) {
      $provide.value('tweetId', tweetIdMock = tweetIdMock);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('DeleteTweetCtrl', { $scope: scope });
    });

    httpBackend.whenGET(/views.*/).respond(200, '');

    scope.tweetId = tweetIdMock;

  });

  it('should have a tweetId', function(){
    expect(scope.tweetId).toBeDefined();
    expect(scope.tweetId).toEqual(tweetIdMock);
  });

  it('should have a deleteTweetConfirmation function', function(){
    expect(scope.deleteTweetConfirmation).toBeDefined();
  });

  describe('when deletion is confirmed', function(){

    beforeEach(function() {
      spyOn(scope, 'deleteTweetConfirmation');
      scope.deleteTweetConfirmation();
    });

    it('should call the deleteTweetConfirmation function', function() {
      expect(scope.deleteTweetConfirmation).toHaveBeenCalled();
    });

    it('should generate correct api end point', function(){
      spyOn(Restangular, 'one').and.callThrough();
      httpBackend.flush();
      expect(apiEndpointFactory.singleTweet(scope.tweetId).route).toEqual('api/tweets/' + scope.tweetId);
      scope.$digest();
    });

    //todo: how to test restangular remove promise?

    //todo: test broadcast after deletion
    //expect(scope.$broadcast).toHaveBeenCalledWith('refreshTweets');

  });


});