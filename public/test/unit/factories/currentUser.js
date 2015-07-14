describe('currentUserFactory', function() {

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      httpBackend = $injector.get('$httpBackend');
      store = $injector.get('store');

      //prevents 'unexpected request: GET views/*/index.html' error
      httpBackend.whenGET(/views.*/).respond(200, '');
    });

  });

  describe('initialisation', function() {

    it('should return false auth check', inject(function (auth){
      expect(auth.isAuthenticated).toBeFalsy();
      expect(auth.profile).toBeFalsy();
    }));

    it('should return false', inject(function (currentUserFactory){
      expect(currentUserFactory).toBeFalsy();
      expect(currentUserFactory.isAuth).toBeFalsy();
      expect(currentUserFactory.user).toBeFalsy();
    }));

  });

/*
  describe('when authenticated', function() {


    it('should return true', inject(function (auth, store, jwtHelper, currentUserFactory){

      expect(currentUserFactory.isAuth).toBeTruthy();
      expect(currentUserFactory.username).toEqual('tomas');
    }));

  });
*/


});