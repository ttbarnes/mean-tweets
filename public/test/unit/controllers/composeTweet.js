describe('ComposeTweetCtrl', function() {

  beforeEach(function() {

    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      currentUserFactory = $injector.get('currentUserFactory');
      tweetsFactory = $injector.get('tweetsFactory');
      ctrl = $controller('ComposeTweetCtrl', {
        $scope: scope,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory,
        tweetsFactory: tweetsFactory
      });

      //prevents 'unexpected request: GET views/*/index.html' error
      httpBackend.whenGET(/views.*/).respond(200, '');

      /*
      ctrl.mockTweet = {
        copy : 'just another tweet',
        image:{
          url: 'http://images.com/random.jpg'
        }
      };
      */


    });

  });

  describe('initialization', function(){

    it('should have a postTweet function', function(){
      expect(scope.postTweet).toBeDefined();
    });

  });

  //todo: how to test restangular put promise?


});