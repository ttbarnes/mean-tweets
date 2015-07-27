describe('DeleteTweetCtrl', function() {

  var $q;
  var scope;
  var ctrl;
  var tweetIdMock = 'b456789akIJmnHJNkmQIk24449';
  var ngDialog;

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

      ngDialog = {
        closeAll: jasmine.createSpy('ngDialog.closeAll').and.callThrough()
      };

      ctrl = $controller('DeleteTweetCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        ngDialog: ngDialog
      });
    });

    tweetId = tweetIdMock;

    httpBackend.whenGET(/views.*/).respond(200, '');
    httpBackend.when('DELETE', '/api/tweets/' + tweetId).respond(200);

    spyOn(Restangular, 'one').and.callThrough();
    spyOn(scope, 'deleteTweetConfirmation').and.callThrough();
    scope.deleteTweetConfirmation();
    httpBackend.flush();
    scope.$digest();

  });

  it('should have a tweetId', function(){
    expect(tweetId).toBeDefined();
    expect(tweetId).toEqual(tweetIdMock);
  });

  it('should have a deleteTweetConfirmation function', function(){
    expect(scope.deleteTweetConfirmation).toBeDefined();
  });

  describe('when deletion is confirmed', function(){

    it('should call the deleteTweetConfirmation function', function() {
      expect(scope.deleteTweetConfirmation).toHaveBeenCalled();
    });

    it('should generate correct api end point', function(){
      expect(apiEndpointFactory.singleTweet(scope.tweetId).route).toEqual('api/tweets/' + scope.tweetId);
    });

    it('should have loading=false', function(){
      expect(scope.loading).toBeFalsy();
    });

    it('should call ngDialog closeAll', function(){
      expect(ngDialog.closeAll).toHaveBeenCalled();
    });

  });

});