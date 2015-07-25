describe('GlobalCtrl', function() {

  var $q;
  var scope;
  var target;
  var ngDialog;

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      auth = $injector.get('auth');
      httpBackend = $injector.get('$httpBackend');

      ngDialog = {
        open: jasmine.createSpy('ngDialog.open').and.callThrough()
      };

      target = $controller('GlobalCtrl', { 
        $scope: scope,
        ngDialog: ngDialog
      });
    });

    httpBackend.whenGET(/views.*/).respond(200, '');

  });

  describe('initialization', function(){

    it('should have the correct app name', function(){
      expect(scope.appName).toEqual('Mean tweets');
    });

    it('should have the correct error heading copy', function(){
      expect(scope.errorHeading).toEqual('Whoops!');
    });

    it('should have auth defined', function(){
      expect(auth).toBeDefined();
    });

    it('should have a login or signup function', function(){
      expect(scope.loginOrSignup).toBeDefined();
    });

    it('should excute login or signup function when called', function(){
      spyOn(scope, 'loginOrSignup');
      scope.loginOrSignup();
      scope.$digest();
      expect(scope.loginOrSignup).toHaveBeenCalled();
    });

    it('should have a compose tweet function', function(){
      expect(scope.composeTweet).toBeDefined();
    });

  });

  describe('compose tweet function', function(){

    beforeEach(function(){
      spyOn(scope, 'composeTweet').and.callThrough();
      scope.composeTweet();
      scope.$digest();
    });
    
    it('should excute compose tweet function when called', function(){
      expect(scope.composeTweet).toHaveBeenCalled();
    });

    it('should call ngDialog open method', function(){
      expect(ngDialog.open).toHaveBeenCalled();
    });

  });

});