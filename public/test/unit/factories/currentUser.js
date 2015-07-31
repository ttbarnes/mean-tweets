'use strict';

describe('currentUserFactory', function() {

  var $q,
      httpBackend,
      store,
      mockUsername,
      auth;

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      httpBackend = $injector.get('$httpBackend');
      store = $injector.get('store');
      auth = $injector.get('auth');

      httpBackend.whenGET(/views.*/).respond(200, '');
    });

  });

  describe('when unauthorised', function() {

    it('should return false auth check', inject(function (auth){
      expect(auth.isAuthenticated).toBeFalsy();
    }));

    it('should return false profile', inject(function (auth){
      expect(auth.profile).toBeFalsy();
    }));

    it('should return false', inject(function (currentUserFactory){
      expect(currentUserFactory).toBeFalsy();
    }));

    it('should return false isAuth', inject(function (currentUserFactory){
      expect(currentUserFactory.isAuth).toBeFalsy();
      expect(currentUserFactory.user).toBeFalsy();
    }));

    it('should return false user', inject(function (currentUserFactory){
      expect(currentUserFactory.user).toBeFalsy();
    }));

  });

  describe('when authorised', function(){

    beforeEach(function(){

      mockUsername = 'jeff';

      /* jshint ignore:start */
      auth.isAuthenticated = true;

      auth.profile = {  
        nickname: mockUsername
      };
      /* jshint ignore:end */

    });

    it('should have mockUsername defined', inject(function (currentUserFactory) {
      expect(currentUserFactory.username).toBeDefined();
      expect(currentUserFactory.username).toEqual(mockUsername);
    }));

    describe('user object creation', function(){

      it('should create user object with isAuth', inject(function (currentUserFactory) {
        expect(currentUserFactory.isAuth).toBeTruthy();
      }));

      it('should create user object with username', inject(function (currentUserFactory) {
        expect(currentUserFactory.username).toBeDefined();
        expect(currentUserFactory.username).toEqual(mockUsername);
      }));

    });

  });

});