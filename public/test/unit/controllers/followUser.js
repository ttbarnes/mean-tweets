describe('FollowUserCtrl', function() {

  var $q;
  var scope;
  var target;

  beforeEach(function() {
    module('FollowUserCtrl');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      httpBackend = $injector.get('$httpBackend');


      ctrl = $controller('GlobalCtrl', { 
        $scope: scope
      });
    });

    httpBackend.whenGET(/views.*/).respond(200, '');

  });


});