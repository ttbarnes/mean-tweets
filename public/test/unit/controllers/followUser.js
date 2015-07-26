describe('FollowUserCtrl', function() {

  var $q;
  var scope;
  var ctrl;

  var currentUserFactoryMockSuccess = {
    isAuth : true,
    username : 'wally'
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
      apiEndPointFactory = $injector.get('apiEndPointFactory');


      ctrl = $controller('FollowUserCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        currentUserFactory: currentUserFactory,
        apiEndPointFactory: apiEndPointFactory
      });
    });

    httpBackend.whenGET(/views.*/).respond(200, '');

  });



});