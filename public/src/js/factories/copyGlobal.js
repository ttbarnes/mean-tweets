angular.module('meanExampleApp').factory('copyGlobalFactory', function (){

    var factory = {};

    factory.appName = 'Mean example';

    return factory;

  });