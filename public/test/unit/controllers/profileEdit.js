describe('ProfileEditCtrl', function() {

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'ryan'
  };

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('currentUserFactory', currentUserFactoryMockSuccess);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      currentUserFactory = $injector.get('currentUserFactory');
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      userProfileFactory = $injector.get('userProfileFactory');

      ctrl = $controller('ProfileEditCtrl', { 
        $scope: scope, 
        $state: state,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory
      });

    });

    //prevents 'unexpected request: GET views/*/index.html' error
    httpBackend.whenGET(/views.*/).respond(200, '');

    var mockProfile = readJSON('test/unit/mock-data/editProfileProfile.json');

    httpBackend.whenGET('/api/profiles/' + scope.loggedInUser).respond(mockProfile);

  });

  describe('initilisation', function(){

    it('should apply currentUserFactory username to scope', function(){
      expect(currentUserFactory.username).toEqual(scope.loggedInUser);
    });

    it('should have updateProfileDetails function', function() {
      expect(scope.updateProfileDetails).toBeDefined();
    });

    it('should generate correct endpoint with userProfileFactory', function(){
      expect(userProfileFactory.user(scope.loggedInUser).route).toEqual('api/profiles/' + scope.loggedInUser);
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

    it('should not call update profile details', function(){
      spyOn(scope, 'updateProfileDetails');
      expect(scope.updateProfileDetails).not.toHaveBeenCalled();
    });

  });

  describe('update profile details', function(){

    beforeEach(function(){
      ctrl.mockData = {
         websiteUrl : 'ryanNewSite.co.uk',
         location : 'Liverpool',
         about : 'Tweeting 24/7'
      }

      ctrl.profileDetails = {
        websiteUrl : ctrl.mockData.websiteUrl,
        location : ctrl.mockData.location,
        about : ctrl.mockData.about
      }

      spyOn(scope, 'updateProfileDetails');
      scope.updateProfileDetails(ctrl.mockData);
    });

    it('should call update profile details', function(){
      expect(scope.updateProfileDetails).toHaveBeenCalled();
    });

    describe('profile details object', function(){

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

    describe('profile details PUT', function(){

      beforeEach(function(){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.flush();
        scope.$digest();
      });

      it('should generate the correct endpoint', function(){
        expect(userProfileFactory.userDetails(currentUserFactory.username).route).toEqual('api/profiles/' + currentUserFactory.username + '/details');
      });

      //todo: how to test restangular customPUT promise?

    });

  });

});