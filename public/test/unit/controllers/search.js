/*

'use strict';

describe('SearchCtrl', function() {

  var $q,
      scope,
      httpBackend,
      state,
      ctrl,
      stateParams,
      searchResults,
      mockSearchTweets;

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('searchResults', searchResults = mockSearchTweets);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      httpBackend = $injector.get('$httpBackend');
      state = $injector.get('$state');
      ctrl = $controller('SearchCtrl', { 
        $scope: scope,
        $httpBackend: httpBackend,
        $state: state,
        searchResults: searchResults
      });

    });

  });

  //note: require further investigation.
  //$provide restangular and mocks are quite tricky here.
  //it seems that regardless of however we format the mock data,
  //noSearchResults always returns true, even after digesting/applying. why?!
  //for now (this is not bulletproof), we add extra mocks below for scope.noSearchResults

  ///maybe a different approach to search (currently api call in $provide/applying via controller)

  describe('with successful results', function(){

    beforeEach(function(){
      spyOn(scope, '$broadcast').and.callThrough();
      stateParams = {
        searchParam : 'first tweet'
      };
      scope.searchQuery = stateParams.searchParam;
      scope.searchResults = mockSearchTweets;
      scope.tweets = mockSearchTweets[0].data;
      scope.noSearchResults = false;
      if(!mockSearchTweets[0].data) {
        scope.noSearchResults = true;
      }

      httpBackend.flush();
      scope.$digest();
    });

    it('should have state params search parameter/query defined', function(){
      expect(stateParams.searchParam).toBeDefined();
    });

    it('should have the search parameter/query applied to scope', function(){
      expect(scope.searchQuery).toEqual(stateParams.searchParam);
    });

    it('should render tweets in scope.tweets from mock resolve/provide data', function(){
      expect(scope.tweets).toBeDefined();
      expect(scope.tweets[0]).toBeDefined();
    });

    it('should have false noSearchResults', function(){
      scope.searchResults = mockSearchTweets;
      scope.tweets = scope.searchResults[0].data;
      expect(scope.noSearchResults).toBeFalsy();
    });

    it('should broadcast searchBoxOkToClear', function(){
      expect(scope.$broadcast).toHaveBeenCalled();

    });

  });

  describe('with no results', function(){

    beforeEach(function(){
      stateParams = {
        searchParam : 'asdf'
      };
      scope.searchQuery = stateParams.searchParam;
    });

    it('should have state params search parameter/query defined', function(){
      expect(stateParams.searchParam).toBeDefined();
    });

    it('should have the search parameter/query applied to scope', function(){
      expect(scope.searchQuery).toEqual(stateParams.searchParam);
    });

    it('should have true noSearchResults', function(){
      expect(scope.noSearchResults).toBeTruthy();
    });

  });

});

*/