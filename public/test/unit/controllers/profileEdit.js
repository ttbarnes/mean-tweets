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

  describe('initilisation', function() {

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
        expect(scope.profile[0].username).toBeDefined();
      });

      it('should return profile data - favourites', function(){
        expect(scope.profile[0].favourites).toBeDefined();
      });
      
      it('should return profile data - followers', function(){
        expect(scope.profile[0].followers).toBeDefined();
      });
      
      it('should return profile data - following', function(){
        expect(scope.profile[0].following).toBeDefined();
      });

      it('should return profile data - retweets', function(){
        expect(scope.profile[0].retweets).toBeDefined();
      });

      it('should return profile data - details', function(){
        expect(scope.profile[0].retweets).toBeDefined();
      });

      it('should assign profile details to scope', function(){
        expect(scope.profileDetails).not.toBeUndefined();
        expect(scope.profileDetails).toEqual(scope.profile[0].details[0]);
      });

    });




  });


});