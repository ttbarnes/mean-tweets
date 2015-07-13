describe('userProfileFactory', function() {

  beforeEach(module(function ($provide) {
    module('meanTweetsApp');
    inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
    });
  }));

  it('should generate correct endpoint with username', function(){
    var username = 'steven';
    var endPoint = userProfileFactory.user(username);
    expect(endPoint.route).toEqual('api/profiles/' + username);
    expect(endPoint.route).not.toContain('/api');
    expect(endPoint.route).not.toEqual('api/profiles/' + username + '/');
  });

});