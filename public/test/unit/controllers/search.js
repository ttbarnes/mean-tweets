'use strict';

describe('SearchCtrl', function() {

  var $q,
      scope,
      state,
      stateParams,
      httpBackend,
      Restangular,
      apiEndpointFactory,
      ctrl,
      mockQuerySuccess = 'testing',
      mockQueryFailure = 'sausages';

  beforeEach(function() {

    specHelper(); //jshint ignore:line

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      state = $injector.get('$state');
      stateParams = $injector.get('$stateParams');
      httpBackend = $injector.get('$httpBackend');
      Restangular = $injector.get('Restangular');
      apiEndpointFactory = $injector.get('apiEndpointFactory');
      ctrl = $controller('SearchCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        $state: state,
        apiEndpointFactory: apiEndpointFactory
      });

    });

    httpBackend.whenGET(/views.*/).respond(200, '');

    httpBackend.whenGET('/api/search/' + mockQuerySuccess).respond(mockSearchTweets); //jshint ignore:line

    httpBackend.whenGET('/api/search/' + mockQueryFailure).respond(404, '');

    spyOn(scope, 'doQuery').and.callThrough();
    httpBackend.flush();
    scope.$digest();
  });

  it('should instantiate the controller', function(){
    expect(ctrl).not.toBeUndefined();
  });

  it('should have a doQuery function', function(){
    expect(scope.doQuery).toBeDefined();
  });

  it('should run doQuery when called', function(){
    scope.doQuery(mockQuerySuccess);
    expect(scope.doQuery).toHaveBeenCalled();
  });

  describe('results failure', function(){

    beforeEach(function(){
      spyOn(Restangular, 'all').and.callThrough();
      scope.doQuery(mockQueryFailure);
      httpBackend.flush();
      scope.$digest();
    });

    it('should declare false tweets', function(){
      expect(scope.tweets).toBeFalsy();
    });

    it('should apply the query to scope', function(){
      expect(scope.searchQuery).toEqual(mockQueryFailure);
    });

    it('should have true noSearchResults', function(){
      expect(scope.noSearchResults).toBeTruthy();
    });

  });

  describe('results success', function(){

    beforeEach(function(){
      spyOn(Restangular, 'all').and.callThrough();
      scope.doQuery(mockQuerySuccess);
      httpBackend.flush();
      scope.$digest();
    });

    it('should declare true tweets', function(){
      expect(scope.tweets).toBeTruthy();
    });

    it('should apply the query to scope', function(){
      expect(scope.searchQuery).toEqual(mockQuerySuccess);
    });

    it('should have false noSearchResults', function(){
      expect(scope.noSearchResults).toBeFalsy();
    });

  });


});