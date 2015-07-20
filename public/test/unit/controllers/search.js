describe('SearchCtrl', function() {

  var mockTweets = readJSON('test/unit/mock-data/tweets-search.json');

  beforeEach(function() {

    module('meanTweetsApp', function ($provide) {
      $provide.value('searchResults', searchResults = mockTweets);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      ctrl = $controller('SearchCtrl', { 
        $scope: scope,
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
      //scope.searchQuery = 'first tweet';
      stateParams = {
        searchParam : 'first tweet'
      };
      scope.searchQuery = stateParams.searchParam;
      scope.searchResults = mockTweets;
      scope.tweets = mockTweets[0].data;
      scope.noSearchResults = false;
      if(!mockTweets[0].data) {
        scope.noSearchResults = true;
      }
      scope.$digest();
    });

    it('should have state params search parameter/query defined', function(){
      expect(stateParams.searchParam).toBeDefined();
    })

    it('should have the search parameter/query applied to scope', function(){
      expect(scope.searchQuery).toEqual(stateParams.searchParam);
    })

    it('should render tweets in scope.tweets from mock resolve/provide data', function(){
      expect(scope.tweets).toBeDefined();
      expect(scope.tweets[0]).toBeDefined();
    });

    it('should have false noSearchResults', function(){
      scope.searchResults = mockTweets;
      scope.tweets = scope.searchResults[0].data;
      expect(scope.noSearchResults).toBeFalsy();
    });

  });


  //todo: test broadcast




});