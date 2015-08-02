'use strict';

describe('LoginCtrl', function() {

  var $q,
      scope,
      auth,
      httpBackend,
      Restangular,
      ctrl,
      mockUsername;

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      auth = $injector.get('auth');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      ctrl = $controller('LoginCtrl', { $scope: scope });
    });

    httpBackend.whenGET(/views.*/).respond(200, '');

    httpBackend.whenPOST('/api/profiles/' + mockUsername).respond(200, '');

    mockUsername = 'alfred';

    auth.profile = {
      nickname: mockUsername
    };

  });

  describe('default login credentials', function(){
    
    it('should have user/email defined', function(){
      expect(scope.user).toBeDefined();
    });

    it('should have password defined', function(){
      expect(scope.pass).toBeDefined();
    });

    it('should have correct user/email', function(){
      expect(scope.user).toEqual('test1@test.com');
    });

    it('should have correct password', function(){
      expect(scope.pass).toEqual('password');
    });

  });

  describe('messages', function(){
    
    it('should have message scope', function(){
      expect(scope.message).toBeDefined();
    });

    it('should have a text field', function(){
      expect(scope.message.text).toBeDefined();
    });

    it('should have empty text field', function(){
      expect(scope.message.text).toEqual('');
    });

  });

  describe('onLoginSuccess function', function(){

    it('should be defined', function(){
      expect(scope.onLoginSuccess).toBeDefined();
    });

    beforeEach(function(){
      spyOn(scope, 'onLoginSuccess').and.callThrough();
      spyOn(Restangular, 'all').and.callThrough();
      scope.onLoginSuccess();
      scope.$digest();
      httpBackend.flush();
    });

    it('should execute when called', function(){
      expect(scope.onLoginSuccess).toHaveBeenCalled();
    });

    it('should add a message to scope', function(){
      expect(scope.message.text).toEqual('');
    });

    it('should declare loading false', function(){
      expect(scope.loading).toBeFalsy();
    });

    it('should generate correct api endpoint', function(){
      expect(Restangular.all('api/profiles/' + auth.profile.nickname).route).toEqual('api/profiles/' + mockUsername);
    });

  });


  describe('onLoginFailed function', function(){

    it('should be defined', function(){
      expect(scope.onLoginFailed).toBeDefined();
    });

    beforeEach(function(){
      spyOn(scope, 'onLoginFailed').and.callThrough();
      scope.onLoginFailed();
      scope.$digest();
    });

    it('should execute when called', function(){
      expect(scope.onLoginFailed).toHaveBeenCalled();
    });

    it('should add a message to scope', function(){
      expect(scope.message.text).toEqual('invalid credentials');
    });

    it('should declare loading false', function(){
      expect(scope.loading).toBeFalsy();
    });

  });

  describe('submit function', function(){

    it('should be defined', function(){
      expect(scope.submit).toBeDefined();
    });

    beforeEach(function(){
      spyOn(scope, 'submit').and.callThrough();
      scope.submit();
      scope.$digest();
    });

    it('should execute when called', function(){
      expect(scope.submit).toHaveBeenCalled();
    });

    it('should add a message to scope', function(){
      expect(scope.message.text).toEqual('loading...');
    });

    it('should declare loading true', function(){
      expect(scope.loading).toBeTruthy();
    });

  });

});