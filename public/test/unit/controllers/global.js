describe('GlobalCtrl', function() {

  var $q;
  var scope;
  var target;

  beforeEach(function() {
    module('meanTweetsApp');

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      target = $controller('GlobalCtrl', { $scope: scope });
    });

  });

  it('should have the correct app name', function(){
    expect(scope.appName).toEqual('Mean tweets');
  });


});