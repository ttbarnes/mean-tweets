'use strict';

describe('ProfileEditCtrl', function() {

  var $q,
      scope,
      state,
      httpBackend,
      Restangular,
      currentUserFactory,
      apiEndpointFactory,
      ctrl;

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      currentUserFactory = $injector.get('currentUserFactory');
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      apiEndpointFactory = $injector.get('apiEndpointFactory');

      ctrl = $controller('ProfileEditCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

    });

    var endpointGET = '/api/profiles/' + scope.loggedInUser;
    var endpointPUT = '/api/profiles/' + scope.loggedInUser + '/details';

    httpBackend.whenGET(/views.*/).respond(200, '');

    httpBackend.when('PUT', endpointPUT).respond(200, '');

    httpBackend.whenGET(endpointGET).respond(mockUser); //jshint ignore:line

    ctrl.mockData = {
       websiteUrl : 'ryanNewSite.co.uk',
       location : 'Liverpool',
       about : 'Tweeting 24/7'
    };

    ctrl.profileDetails = {
      websiteUrl : ctrl.mockData.websiteUrl,
      location : ctrl.mockData.location,
      about : ctrl.mockData.about
    };

  });

  describe('initilisation', function(){

    it('should instantiate the controller', function(){
      expect(ctrl).not.toBeUndefined();
    });

    it('should apply currentUserFactory username to scope', function(){
      expect(currentUserFactory.username).toEqual(scope.loggedInUser);
    });

    it('should have updateProfileDetails function', function() {
      expect(scope.updateProfileDetails).toBeDefined();
    });

    it('should generate correct endpoint with apiEndpointFactory', function(){
      expect(apiEndpointFactory.user(scope.loggedInUser).route).toEqual('api/profiles/' + scope.loggedInUser);
    });

    it('should not call update profile details', function(){
      spyOn(scope, 'updateProfileDetails');
      expect(scope.updateProfileDetails).not.toHaveBeenCalled();
    });

    describe('get profile data', function(){

      beforeEach(function(){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.flush();
      });

      it('should return profile data', function(){
        expect(scope.profile).not.toBeUndefined();
      });

      it('should return profile data - username', function(){
        expect(scope.profile.username).toBeDefined();
      });

      it('should return profile data - favourites', function(){
        expect(scope.profile.favourites).toBeDefined();
      });
      
      it('should return profile data - followers', function(){
        expect(scope.profile.followers).toBeDefined();
      });
      
      it('should return profile data - following', function(){
        expect(scope.profile.following).toBeDefined();
      });

      it('should return profile data - retweets', function(){
        expect(scope.profile.retweets).toBeDefined();
      });

      it('should return profile data - details', function(){
        expect(scope.profile.retweets).toBeDefined();
      });

      it('should assign profile details to scope', function(){
        expect(scope.profileDetails).not.toBeUndefined();
        expect(scope.profileDetails).toEqual(scope.profile.details[0]);
      });

    });

  });

  describe('profile details object', function(){
    beforeEach(function(){
      spyOn(scope, 'updateProfileDetails');
      scope.updateProfileDetails(ctrl.mockData);
    });

    it('should call update profile details', function(){
      expect(scope.updateProfileDetails).toHaveBeenCalled();
    });

    it('should generate profileDetails object', function(){
      expect(ctrl.profileDetails).toBeDefined();
    });

    it('should generate correct websiteUrl property', function(){
      expect(ctrl.profileDetails.websiteUrl).toBeDefined();
      expect(ctrl.profileDetails.websiteUrl).toEqual(ctrl.mockData.websiteUrl);
    });

    it('should generate correct location property', function(){
      expect(ctrl.profileDetails.location).toBeDefined();
      expect(ctrl.profileDetails.location).toEqual(ctrl.mockData.location);
    });

    it('should generate correct about property', function(){
      expect(ctrl.profileDetails.about).toBeDefined();
      expect(ctrl.profileDetails.about).toEqual(ctrl.mockData.about);
    });

  });

  describe('api call/promise failure', function(){

    beforeEach(function(){
      scope.updateProfileDetails(ctrl.mockData);
      scope.$digest();
    });

    it('should generate the correct endpoint', function(){
      expect(apiEndpointFactory.userDetails(currentUserFactory.username).route).toEqual('api/profiles/' + currentUserFactory.username + '/details');
    });

    it('should have loading=false', function(){
      expect(scope.loading).toBeTruthy();
    });

    it('should have loadingSuccess=true', function(){
      expect(scope.loadingSuccess).toBeFalsy();
    });

  });

  describe('api call/promise success', function(){

    beforeEach(function(){
      scope.updateProfileDetails(ctrl.mockData);
      httpBackend.flush();
      scope.$digest();
    });

    it('should have loading=false', function(){
      expect(scope.loading).toBeFalsy();
    });

    it('should have loadingSuccess=true', function(){
      expect(scope.loadingSuccess).toBeTruthy();
    });

  });

});