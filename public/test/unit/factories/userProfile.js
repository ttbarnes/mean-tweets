describe('userProfileFactory', function() {

  beforeEach(module(function() {
    module('meanTweetsApp');
    inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
    });
  }));

  it('should generate correct user endpoint with username', function(){
    var username = 'steven';
    var endPoint = userProfileFactory.user(username);
    expect(endPoint.route).toEqual('api/profiles/' + username);
    expect(endPoint.route).not.toContain('/api');
    expect(endPoint.route).not.toEqual('api/profiles/' + username + '/');
  });

  it('should generate correct favourites endpoint with username', function(){
    var username = 'bob';
    var tweetId = 'an12lj3l1md0890fdm';
    var endPoint = userProfileFactory.favourites(username, tweetId);
    expect(endPoint.route).toEqual('api/profiles/' + username + '/tweets/favourites/' + tweetId);
    expect(endPoint.route).not.toContain('/api');
    expect(endPoint.route).not.toEqual('api/profiles/' + username + '/tweets/favourites/' + tweetId + '/');
  });

});