//usage eg:
//
//userProfileFactory.user('support2').getList().then(function (user){ ... });
//

angular.module('meanExampleApp').factory('userProfileFactory', function (Restangular){

    return {
      user: function(username) {
        return Restangular.all('api/profiles/' + username );
      }
    }

  });