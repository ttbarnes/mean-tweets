describe('TweetsCtrl', function() {

  var $q;
  var scope;
  var target;

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      target = $controller('TweetsCtrl', { $scope: scope });
    });

  });

  describe('apiRoute object', function(){

    it('should be defined', function(){
      expect(target.apiRoute).toBeDefined();
    })

    it('should have correct tweets endpoint ', function(){
      expect(target.apiRoute.tweets).toBeDefined();
      expect(target.apiRoute.tweets).toEqual('api/tweets/');
    });

    it('should have correct profiles endpoint ', function(){
      expect(target.apiRoute.profiles).toBeDefined();
      expect(target.apiRoute.profiles).toEqual('api/profiles/');
    });


  });



});