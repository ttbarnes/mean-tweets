describe('TweetFavouriteCtrl', function() {

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'thor'
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('TweetFavouriteCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        apiEndpointFactory: apiEndpointFactory,
        currentUserFactory: currentUserFactory
      });

      tweetId   = '1k2n4jn4mn5l1mn3k4';
      favouriteId = '9b7nh7e2j4w9x1m2w3';

      httpBackend.whenGET(/views.*/).respond(200, '');

      httpBackend.whenGET('/api/tweets/' + tweetId + '/favourites').respond(200, '');

    });

  });

  describe('initialization', function(){

    it('should have a favouriteTweet function', function(){
      expect(scope.favouriteTweet).toBeDefined();
    });

    it('should run favouriteTweet when called', function(){
      spyOn(scope, 'favouriteTweet');
      scope.favouriteTweet(tweetId);
      expect(scope.favouriteTweet).toHaveBeenCalled();
    });

    it('should have a unFavouriteTweet function', function(){
      expect(scope.unFavouriteTweet).toBeDefined();
    });

    it('should run unFavouriteTweet when called', function(){
      spyOn(scope, 'unFavouriteTweet');
      scope.unFavouriteTweet(tweetId, favouriteId);
      expect(scope.unFavouriteTweet).toHaveBeenCalled();
    });

  });

  describe('favourite tweet', function(){

    beforeEach(function(){

      ctrl.mockNewFavourite = {
        username : currentUserFactory.username
      }

      ctrl.newFavourite = {
        username : ctrl.mockNewFavourite.username
      }

      spyOn(scope, 'favouriteTweet');
      scope.favouriteTweet(tweetId);

    });

    describe('new favourite object', function(){

      it('should generate newFavourite object', function(){
        expect(ctrl.newFavourite).toBeDefined();
      });

      describe('username property', function(){

        it('should be generated', function(){
          expect(ctrl.newFavourite.username).toBeDefined();
        });

        it('should equal current username', function(){
          expect(ctrl.newFavourite.username).toEqual(currentUserFactory.username);
        });

      });

    });

    describe('new favourite PUT success', function(){

      beforeEach(function(){
        spyOn(Restangular, 'one').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint - route: favourites', function(){
        expect(apiEndpointFactory.favourites(tweetId).route).toEqual('api/tweets/' + tweetId + '/favourites');
      });

      it('should generate the correct endpoint - route: userFavourites', function(){
        expect(apiEndpointFactory.userFavourites(currentUserFactory.username, tweetId).route).toEqual('api/profiles/' + currentUserFactory.username + '/tweets/favourites/' + tweetId);
      });

      it('should have loading=false', function(){
        expect(scope.loading).toBeFalsy();
      });

    });

  });

  describe('unFavourite tweet REMOVE', function(){

    beforeEach(function(){
      spyOn(scope, 'unFavouriteTweet');
      spyOn(Restangular, 'one').and.callThrough();
      scope.unFavouriteTweet(tweetId, favouriteId);
      httpBackend.flush();
      scope.$digest();
    });

    it('should generate the correct endpoint - route: singleFavourite', function(){
      expect(apiEndpointFactory.singleFavourite(tweetId, favouriteId).route).toEqual('api/tweets/' + tweetId + '/favourites/' + favouriteId);
    });

    it('should generate the correct endpoint - route: userFavourites', function(){
      expect(apiEndpointFactory.userFavourites(currentUserFactory.username, tweetId).route).toEqual('api/profiles/' + currentUserFactory.username + '/tweets/favourites/' + tweetId);
    });

    it('should have loading=false', function(){
      expect(scope.loading).toBeFalsy();
    });

  });

});